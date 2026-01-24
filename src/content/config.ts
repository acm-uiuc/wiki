import { z, defineCollection } from "astro:content";

// schema for mdx frontmatter. thanks claude

const classesCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        subject: z.string(),
        section: z.string().optional().default(""),
        number: z.number(),
        credits: z.number(),
        description: z.string(),
        prerequisites: z.array(z.string()).optional().default([]),
        tags: z.array(z.string()).optional().default([]),
    }),
});

const guidesCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number().optional().default(0),
        category: z.string().optional(),
    }),
});

export const collections = {
    classes: classesCollection,
    guides: guidesCollection,
};
