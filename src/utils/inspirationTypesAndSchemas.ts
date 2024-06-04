import { z } from "zod";

export const inspirationSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  thumbnail: z.string().url().optional().nullable(),
  favicon: z.string().url().optional().nullable(),
  date: z.string(),
  tags: z.string().array().default([]),
});
export type InspirationType = z.infer<typeof inspirationSchema>;

export const inspirationInsertSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  tags: z.string().array().default([]),
});
export type InspirationInsertType = z.infer<typeof inspirationInsertSchema>;
