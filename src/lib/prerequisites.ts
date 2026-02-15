import { getCollection } from 'astro:content';
import { VALID_SUBJECTS } from './constants';

// Regex to detect course codes: "CS 124" or "CS 598 APE"
const COURSE_CODE_REGEX = /^([A-Z]{2,4})\s+(\d{3})(?:\s+([A-Z0-9]{2,4}))?$/i;

/**
 * Prerequisite can be a single item or an OR group (array of items)
 * Top-level array items are ANDed together
 * Example: [["MATH 257", "MATH 415"], "CS 225"] = (MATH 257 OR MATH 415) AND CS 225
 */
export type PrerequisiteItem = string | string[];
export type Prerequisites = PrerequisiteItem[];

export interface ParsedPrerequisite {
  original: string;
  type: 'course' | 'text';
  subject?: string;
  number?: number;
  section?: string;
}

/**
 * Parse a prerequisite string to determine if it's a course code or free-form text
 */
export function parsePrerequisite(prereq: string): ParsedPrerequisite {
  const match = prereq.trim().match(COURSE_CODE_REGEX);

  if (match) {
    const subject = match[1].toUpperCase();
    const number = parseInt(match[2], 10);
    const section = match[3]?.toUpperCase();

    // Only recognize subjects we track
    if (VALID_SUBJECTS.includes(subject)) {
      return {
        original: prereq,
        type: 'course',
        subject,
        number,
        section,
      };
    }
  }

  // Free-form text
  return {
    original: prereq,
    type: 'text',
  };
}

/**
 * Build a Set of existing course slugs from the classes collection
 */
export async function buildCourseIndex(): Promise<Set<string>> {
  const classes = await getCollection('classes');
  const index = new Set<string>();

  for (const entry of classes) {
    const { subject, number, section } = entry.data;
    // Slug format: "CS124" or "CS598APE"
    const slug = `${subject}${number}${section || ''}`;
    index.add(slug);
  }

  return index;
}

/**
 * Generate the appropriate link for a parsed course prerequisite
 */
export function getCourseLink(
  parsed: ParsedPrerequisite,
  courseIndex: Set<string>
): { url: string; isInternal: boolean } | null {
  if (parsed.type !== 'course' || !parsed.subject || !parsed.number) {
    return null;
  }

  const slug = `${parsed.subject}${parsed.number}${parsed.section || ''}`;

  if (courseIndex.has(slug)) {
    // Internal wiki article exists
    return {
      url: `/classes/${parsed.subject}/${slug}`,
      isInternal: true,
    };
  }

  // External link to Course Explorer
  return {
    url: `https://courses.illinois.edu/schedule/terms/${parsed.subject}/${parsed.number}`,
    isInternal: false,
  };
}
