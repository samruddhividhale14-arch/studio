'use server';

/**
 * @fileOverview An AI-powered field care suggestion flow for farmers.
 *
 * - getFieldCareSuggestions - A function that provides field care suggestions.
 * - FieldCareSuggestionsInput - The input type for the getFieldCareSuggestions function.
 * - FieldCareSuggestionsOutput - The return type for the getFieldCareSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FieldCareSuggestionsInputSchema = z.object({
  fieldData: z
    .string()
    .describe(
      'A description of the current field conditions, including crop type, soil moisture, weather, and any observed issues.'
    ),
  cropType: z.string().describe('The type of crop being grown in the field.'),
  location: z.string().describe('Location of the field.'),
});
export type FieldCareSuggestionsInput = z.infer<typeof FieldCareSuggestionsInputSchema>;

const FieldCareSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'AI-powered suggestions for field care, including irrigation, fertilization, pest control, and disease prevention.'
    ),
});
export type FieldCareSuggestionsOutput = z.infer<typeof FieldCareSuggestionsOutputSchema>;

export async function getFieldCareSuggestions(
  input: FieldCareSuggestionsInput
): Promise<FieldCareSuggestionsOutput> {
  return fieldCareSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fieldCareSuggestionsPrompt',
  input: {schema: FieldCareSuggestionsInputSchema},
  output: {schema: FieldCareSuggestionsOutputSchema},
  prompt: `You are an expert agricultural advisor providing field care suggestions to farmers.

  Based on the current field conditions, crop type, and location, provide actionable suggestions for:
  - Irrigation
  - Fertilization
  - Pest control
  - Disease prevention

  Field Data: {{{fieldData}}}
  Crop Type: {{{cropType}}}
  Location: {{{location}}}
  `,
});

const fieldCareSuggestionsFlow = ai.defineFlow(
  {
    name: 'fieldCareSuggestionsFlow',
    inputSchema: FieldCareSuggestionsInputSchema,
    outputSchema: FieldCareSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
