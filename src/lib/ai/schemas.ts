import { z } from 'zod';

export const AdvisoryRequestSchema = z.object({
  farmerId: z.string(),
  crop: z.string().min(1, 'Crop name is required'),
  farmSize: z.string().min(1, 'Farm size is required'),
  soilType: z.string().min(1, 'Soil type is required'),
  question: z.string().min(2, 'Question is required'),
});

export const AdvisoryResponseSchema = z.object({
  crop: z.string(),
  farmSize: z.string(),
  recommendedProduct: z.string(),
  recommendedQuantity: z.string(),
  applicationMethod: z.string(),
  timing: z.string(),
  precautions: z.string(),
  reasoning: z.string(),
  disclaimer: z.string(),
});

export type AdvisoryRequestInput = z.infer<typeof AdvisoryRequestSchema>;
export type AdvisoryResponseOutput = z.infer<typeof AdvisoryResponseSchema>;
