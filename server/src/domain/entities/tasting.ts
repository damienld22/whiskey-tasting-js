import { z } from 'zod';

export const TastingSchema = z.object({
  _id: z.string(),
  score: z.number().int().min(1).lte(5),
  drinkName: z.string(),
  smell: z.string().optional(),
  taste: z.string().optional(),
  color: z.string().optional(),
  picture: z.string().optional(),
  date: z.string().optional(),
  comment: z.string().optional(),
});

export const TastingFormSchema = TastingSchema.omit({ _id: true });

export type Tasting = z.infer<typeof TastingSchema>;
export type TastingForm = z.infer<typeof TastingFormSchema>;
