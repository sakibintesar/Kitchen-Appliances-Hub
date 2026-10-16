import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/experiences' }),
  schema: z.object({
    order: z.number(),
    label: z.string(),
    tagline: z.string(),
    description: z.string(),
    heroImage: z.string(),
    heroImageMobile: z.string(),
    heroAlt: z.string(),
    gradientFrom: z.string(),
    gradientTo: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    appliances: z.array(
      z.object({
        name: z.string(),
        model: z.string(),
        price: z.number(),
        image: z.string(),
      })
    ),
    totalInvestment: z.number(),
    cta: z.object({ label: z.string(), href: z.string() }),
  }),
});

export const collections = { experiences };
