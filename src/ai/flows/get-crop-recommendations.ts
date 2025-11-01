'use server';
/**
 * @fileOverview An AI-powered crop recommendation flow for farmers.
 *
 * - getCropRecommendations - A function that provides crop care recommendations.
 * - CropRecommendationsInput - The input type for the getCropRecommendations function.
 * - CropRecommendationsOutput - The return type for the getCropRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationsInputSchema = z.object({
  cropType: z.string().describe('The type of crop being grown.'),
  zoneId: z.string().describe('The specific zone in the field.'),
  location: z.string().describe('The geographical location of the farm.'),
  zoneHealth: z
    .string()
    .describe(
      'A summary of the current health of the zone, including any known issues like nutrient deficiency or water stress.'
    ),
});
export type CropRecommendationsInput = z.infer<typeof CropRecommendationsInputSchema>;

const CropRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Actionable recommendations for maintaining or improving crop health in the specified zone. This can include suggestions for fertilization, irrigation, pest control, and soil management.'
    ),
});
export type CropRecommendationsOutput = z.infer<typeof CropRecommendationsOutputSchema>;

export async function getCropRecommendations(
  input: CropRecommendationsInput
): Promise<CropRecommendationsOutput> {
  return cropRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRecommendationsPrompt',
  input: {schema: CropRecommendationsInputSchema},
  output: {schema: CropRecommendationsOutputSchema},
  prompt: `You are an expert agronomist. A farmer needs recommendations for a specific zone on their farm.

Provide actionable advice to maintain or improve crop health based on the following details.
Your recommendations should be practical, easy to implement, and presented as a numbered list of 3 to 4 points. Ensure there is a blank line between each point.

- Crop Type: {{{cropType}}}
- Field Zone: {{{zoneId}}}
- Location: {{{location}}}
- Current Zone Health Summary: {{{zoneHealth}}}

Focus on fertilization, irrigation, pest control, and soil management.
`,
});

const cropRecommendationsFlow = ai.defineFlow(
  {
    name: 'cropRecommendationsFlow',
    inputSchema: CropRecommendationsInputSchema,
    outputSchema: CropRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
