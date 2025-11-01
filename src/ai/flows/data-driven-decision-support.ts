'use server';

/**
 * @fileOverview Provides data-driven decision support for farmers based on field data and predictive analysis.
 *
 * - getDataDrivenDecisionSupport - A function that returns suggestions to the farmers.
 * - DataDrivenDecisionSupportInput - The input type for the getDataDrivenDecisionSupport function.
 * - DataDrivenDecisionSupportOutput - The return type for the getDataDrivenDecisionSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DataDrivenDecisionSupportInputSchema = z.object({
  fieldData: z
    .string()
    .describe('The current data from the field, including crop type, soil moisture, temperature, and recent weather conditions.'),
  weatherForecast: z
    .string()
    .describe('A weather forecast for the next 7 days, including temperature, precipitation, and wind speed.'),
  pestInfestationLikelihood: z
    .string()
    .describe('The likelihood of pest infestation based on recent reports and field conditions.'),
});
export type DataDrivenDecisionSupportInput = z.infer<typeof DataDrivenDecisionSupportInputSchema>;

const DataDrivenDecisionSupportOutputSchema = z.object({
  plantingSuggestions: z.string().describe('Suggestions for planting, including optimal planting dates and crop varieties.'),
  irrigationSuggestions: z.string().describe('Suggestions for irrigation, including optimal watering schedules and amounts.'),
  pestControlSuggestions: z
    .string()
    .describe('Suggestions for pest control, including recommended pesticides and application methods.'),
  otherSuggestions: z.string().describe('Any other suggestions for optimizing crop management practices.'),
});
export type DataDrivenDecisionSupportOutput = z.infer<typeof DataDrivenDecisionSupportOutputSchema>;

export async function getDataDrivenDecisionSupport(input: DataDrivenDecisionSupportInput): Promise<DataDrivenDecisionSupportOutput> {
  return dataDrivenDecisionSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dataDrivenDecisionSupportPrompt',
  input: {schema: DataDrivenDecisionSupportInputSchema},
  output: {schema: DataDrivenDecisionSupportOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the following field data, weather forecast, and pest infestation likelihood, provide data-driven decision support for the farmer.

Field Data: {{{fieldData}}}
Weather Forecast: {{{weatherForecast}}}
Pest Infestation Likelihood: {{{pestInfestationLikelihood}}}

Consider the following:
- Optimal planting dates and crop varieties based on the weather forecast.
- Optimal watering schedules and amounts based on the field data and weather forecast.
- Recommended pesticides and application methods based on the pest infestation likelihood.
- Any other suggestions for optimizing crop management practices.

{{outputSchema.plantingSuggestions.description}}
{{outputSchema.irrigationSuggestions.description}}
{{outputSchema.pestControlSuggestions.description}}
{{outputSchema.otherSuggestions.description}}
`,
});

const dataDrivenDecisionSupportFlow = ai.defineFlow(
  {
    name: 'dataDrivenDecisionSupportFlow',
    inputSchema: DataDrivenDecisionSupportInputSchema,
    outputSchema: DataDrivenDecisionSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
