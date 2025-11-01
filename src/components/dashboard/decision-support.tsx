'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  DataDrivenDecisionSupportInput,
  DataDrivenDecisionSupportOutput,
  getDataDrivenDecisionSupport,
} from '@/ai/flows/data-driven-decision-support';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BrainCircuit, Leaf, Loader2, Syringe, SprayCan } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  fieldData: z
    .string()
    .min(10, 'Please provide more detailed field data.'),
  weatherForecast: z
    .string()
    .min(10, 'Please provide a more detailed weather forecast.'),
  pestInfestationLikelihood: z
    .string()
    .min(5, 'Please describe the pest likelihood.'),
});

export function DecisionSupport() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<DataDrivenDecisionSupportOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldData:
        'Crop: Corn, Stage: Vegetative. Soil moisture: 45%. Temperature: 25°C. Recent weather: Sunny with light winds.',
      weatherForecast:
        'Next 7 days: Avg temp 28°C, 20mm rain expected on day 3, wind speed 15 km/h.',
      pestInfestationLikelihood:
        'Low. No recent sightings of major pests. Some aphids spotted on 5% of plants.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const output = await getDataDrivenDecisionSupport(
        values as DataDrivenDecisionSupportInput
      );
      setResult(output);
    } catch (e) {
      setError('Failed to get suggestions. Please try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BrainCircuit className="h-6 w-6" />
          <span>AI Decision Support</span>
        </CardTitle>
        <CardDescription>
          Enter your current field and weather data to receive AI-powered
          recommendations.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="fieldData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Crop type, soil moisture, temperature..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherForecast"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather Forecast</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Next 7 days temperature, precipitation..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pestInfestationLikelihood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pest Likelihood</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Recent reports, field conditions..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {result && (
              <div>
                <h3 className="mb-4 text-lg font-semibold font-headline">
                  AI Recommendations
                </h3>
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold"><Leaf className="mr-2 h-5 w-5 text-primary"/>Planting Suggestions</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{result.plantingSuggestions}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold"><SprayCan className="mr-2 h-5 w-5 text-primary"/>Irrigation Suggestions</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{result.irrigationSuggestions}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold"><Syringe className="mr-2 h-5 w-5 text-primary"/>Pest Control Suggestions</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{result.pestControlSuggestions}</AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4">
                    <AccordionTrigger className="font-semibold">Other Suggestions</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{result.otherSuggestions}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading ? 'Generating...' : 'Get Suggestions'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
