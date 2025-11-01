'use client';

import { useState } from 'react';
import {
  CropRecommendationsInput,
  CropRecommendationsOutput,
  getCropRecommendations,
} from '@/ai/flows/get-crop-recommendations';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/provider';

interface CropRecommendationsProps {
  zoneId: string;
  cropType: string;
}

export function CropRecommendations({
  zoneId,
  cropType,
}: CropRecommendationsProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const input: CropRecommendationsInput = {
      zoneId,
      cropType,
      location: 'Central Valley, California', // This could be dynamic in a real app
      zoneHealth:
        'The zone shows signs of moderate water stress and slight nitrogen deficiency. Pest activity is low.', // This could also be dynamic
    };

    try {
      const output = await getCropRecommendations(input);
      setResult(output);
    } catch (e) {
      setError('Failed to get recommendations. Please try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-center">
          {t('myFieldsPage.recommendations.title')}
        </CardTitle>
        <CardDescription className="text-center text-xs px-2">
          {t('myFieldsPage.recommendations.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>{t('myFieldsPage.recommendations.error.title')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div>
            <h4 className="mb-2 font-semibold">
              {t('myFieldsPage.recommendations.resultsTitle')}
            </h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {result.recommendations}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button
          onClick={handleGetRecommendations}
          disabled={loading}
          className="w-full"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading
            ? t('myFieldsPage.recommendations.form.button.loading')
            : t('myFieldsPage.recommendations.form.button.idle')}
        </Button>
      </CardFooter>
    </Card>
  );
}
