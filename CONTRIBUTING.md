# Contributing to the Illinois CS Wiki

Thanks for your interest in contributing! This wiki is maintained by students for students. Here's how to add content.

## License Agreement

By contributing to this wiki, you agree to license your contributions under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). You retain copyright to your work, but grant others the right to share and adapt it under the same license terms. This means:

- Your work can be shared and adapted with attribution
- No commercial use without permission
- Derivative works must use the same license

## Quick Start

1. Fork and clone the repository
2. Install dependencies: `yarn install`
3. Start the dev server: `yarn dev`
4. Make your changes
5. Submit a pull request

## Adding a Course Article

Course articles live in `src/content/classes/[SUBJECT]/` as MDX files.

### File Location & Naming

Place your file in the appropriate subject folder, with the subject being named as the department code:
- `src/content/classes/CS/` - Computer Science
- `src/content/classes/MATH/` - Mathematics
- `src/content/classes/STAT/` - Statistics
- `src/content/classes/ECE/` - Electrical & Computer Engineering
- `src/content/classes/PHYS/` - Physics

Name the file using the course code in lowercase: `cs124.mdx`, `math241.mdx`, etc.

For special sections (like CS 498 topics), include the section: `cs498cca.mdx`.

### Course Frontmatter Template

```yaml
---
title: "CS 124 - Intro to Computer Science I"
subject: "CS"
number: 124
credits: 3
instructor: "Geoffrey Challen"         # optional, primary instructor
description: "Official course description from the course catalog"
prerequisites: ["CS 101", "MATH 220"]  # optional, list prerequisite courses
tags: ["core", "programming"]          # optional, relevant tags
section: ""                            # optional, for special topics courses
---
```

**Required fields:**
- `title` - Course name, format: "SUBJ NUM - Course Name"
- `subject` - One of: CS, MATH, STAT, ECE, PHYS
- `number` - Course number as an integer (e.g., 124, not "124")
- `credits` - Credit hours as an integer
- `description` - Official course description

**Optional fields:**
- `instructor` - Primary course instructor
- `prerequisites` - Array of prerequisite courses (see format below)
- `tags` - Array of relevant tags (e.g., "core", "theory", "systems")
- `section` - Section identifier for special topics courses (e.g., "APE" for CS 598 APE)

### Prerequisite Format

Prerequisites support AND/OR logic:

```yaml
# Simple list - all required (AND)
prerequisites: ["CS 124", "MATH 241"]

# OR group - one of these required
prerequisites: [["MATH 257", "MATH 415", "MATH 416"]]

# Mixed: (MATH 257 OR MATH 415) AND CS 225
prerequisites: [["MATH 257", "MATH 415"], "CS 225"]

# Free-form text (for non-course requirements)
prerequisites: ["CS 124", "Three years of high school math"]
```

**Smart Linking**: Course codes automatically become links:
- Courses with wiki articles → link to the wiki page (orange)
- Courses without wiki articles → link to Course Explorer (gray with icon)
- Free-form text → displayed as plain text (no link)

### Suggested Course Article Sections

```markdown
Brief overview paragraph about the course and what students should expect.

## Course Content
- Topic 1
- Topic 2
- Topic 3

## Instructors
[Professor Name](link to faculty page)

## Prerequisites
Explain prerequisites and recommended background.

## Workload
Describe typical weekly time commitment, assignment types, and exam format.

## Resources
- [Course Website](url)
- [Textbook](url)
- Other helpful resources

## Tips
Student advice for succeeding in the course.

## Proficiency Exam
If applicable, information about proficiency exams.
```

## Adding a Guide

Guides are general articles that aren't course-specific. They live in `src/content/guides/`.

### File Location & Naming

Place your file in `src/content/guides/` with a descriptive slug: `gmail.mdx`, `freshman.mdx`, etc.

### Guide Frontmatter Template

```yaml
---
title: "Your Guide Title"
description: "A brief description of what this guide covers"
order: 1        # optional, controls sidebar ordering (lower = higher)
category: "Tech"  # optional, for grouping related guides
---
```

**Required fields:**
- `title` - Guide title
- `description` - Brief description (shown in previews)

**Optional fields:**
- `order` - Number for sidebar ordering (default: 0)
- `category` - Category name for grouping

### Guide Content Tips

- Start with a brief intro explaining what the guide covers
- Use clear headings to organize sections
- Include screenshots when helpful (place in `public/img/`)
- Add disclaimers for anything that might change or have caveats

## Writing Tips

### Formatting

- Use MDX (Markdown with JSX support)
- Use headings hierarchically: `##` for main sections, `###` for subsections
- Use code blocks with language tags for code snippets
- Use bullet points for lists of items

### Images

1. Place images in `public/img/`
2. Reference them with absolute paths: `![Alt text](/img/your-image.png)`

### Links

- External links: `[Text](https://example.com)`
- Internal course links: `[CS 124](/classes/CS/cs124)`
- Internal guide links: `[Guide Name](/guides/guide-slug)`

### Style Guidelines

- Write in a helpful, student-to-student tone
- Be objective about course difficulty and workload
- Include both official info and practical student perspectives
- Keep information current - note semesters if things change frequently
- Avoid naming specific TAs (they change each semester)

## Testing Your Changes

1. Run the dev server: `yarn dev`
2. Visit `http://localhost:4321`
3. Navigate to your new page and verify:
   - Page renders without errors
   - Frontmatter displays correctly
   - Links work
   - Images load

## Submitting Your Contribution

1. Commit your changes with a descriptive message
2. Push to your fork (or branch if you are an internal ACM contributor)
3. Open a pull request against `main`
4. Describe what you added/changed in the PR description

## Questions?

If you have questions about contributing, open an issue or reach out to ACM@UIUC Academic Committee.
