import { z, defineCollection, reference } from 'astro:content';

const contentBase = {
    title: z.string(),
    status: z.enum(['draft', 'published', 'deprecated']),
    tags: z.string().array(),
    related: z
        .array(
            z.record(
                z.string(), // Turn into enum?
                z.union([reference('blog'), reference('knb'), reference('scratch')]),
            ),
        )
        .optional(),
};

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        ...contentBase,
        image: z.string().optional(),
        description: z.string().optional(),
        subtitle: z.string().optional(),
    }),
});

const blockCollection = defineCollection({
    type: 'content',
    schema: z.object({
        ...contentBase,
        image: z.string().optional(),
    }),
});

const serviceCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        detail: z.string(),
        status: z.enum(['open', 'closed', 'waitlist']),
        tags: z.string().array().optional(),
        image: z.string().optional(),
    }),
});

export const collections = {
    blog: blogCollection,
    blocks: blockCollection,
    services: serviceCollection,
};
