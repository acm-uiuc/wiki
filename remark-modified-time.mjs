import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';

function getIgnoredRevs() {
  try {
    const ignoreRevsFile = execSync('git config blame.ignoreRevsFile')
      .toString()
      .trim();
    if (!existsSync(ignoreRevsFile)) return [];
    return readFileSync(ignoreRevsFile, 'utf-8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
  } catch {
    return [];
  }
}

export function remarkModifiedTime() {
  // Do not count commits which are ignored in Git blame (for example, formatting)
  const ignoredRevs = new Set(getIgnoredRevs());

  return function (_tree, file) {
    const filepath = file.history[0];
    // Get recent commits for this file
    const result = execSync(
      `git log --pretty="format:%H %cI" --follow "${filepath}"`
    )
      .toString()
      .trim();

    const lines = result.split('\n').filter(Boolean);
    for (const line of lines) {
      const [hash, ...dateParts] = line.split(' ');
      if (!ignoredRevs.has(hash)) {
        file.data.astro.frontmatter.lastModified = dateParts.join(' ');
        return;
      }
    }

    // Fallback: use the oldest commit if all are ignored
    if (lines.length > 0) {
      const [, ...dateParts] = lines[lines.length - 1].split(' ');
      file.data.astro.frontmatter.lastModified = dateParts.join(' ');
    }
  };
}
