'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FieldStatsChart } from './field-stats-chart';
import { useLanguage } from '@/i18n/provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const waterData = [
  { metric: 'high', value: 60, fill: 'hsl(var(--chart-4))' },
  { metric: 'medium', value: 40, fill: 'hsl(var(--chart-5))' },
];

const pestData = [
  { metric: 'high', value: 30, fill: 'hsl(var(--chart-3))' },
  { metric: 'medium', value: 70, fill: 'hsl(var(--chart-1))' },
];

const nutritionData = [
  { metric: 'high', value: 45, fill: 'hsl(var(--chart-2))' },
  { metric: 'medium', value: 55, fill: 'hsl(var(--chart-1))' },
];

export function CropDetailsTabs() {
  const { t } = useLanguage();
  return (
    <Tabs defaultValue="water" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="water">{t('myFieldsPage.cropDetails.water.title')}</TabsTrigger>
        <TabsTrigger value="pest">{t('myFieldsPage.cropDetails.pest.title')}</TabsTrigger>
        <TabsTrigger value="nutrition">{t('myFieldsPage.cropDetails.nutrition.title')}</TabsTrigger>
      </TabsList>
      <TabsContent value="water">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-center">{t('myFieldsPage.cropDetails.water.distributionTitle')}</CardTitle>
          </CardHeader>
          <FieldStatsChart chartData={waterData} height="200px" customChartConfig={{
            high: { label: t('myFieldsPage.cropDetails.levels.high') },
            medium: { label: t('myFieldsPage.cropDetails.levels.medium') },
          }} />
        </Card>
      </TabsContent>
      <TabsContent value="pest">
        <Card>
          <CardHeader>
             <CardTitle className="text-base text-center">{t('myFieldsPage.cropDetails.pest.distributionTitle')}</CardTitle>
          </CardHeader>
          <FieldStatsChart chartData={pestData} height="200px" customChartConfig={{
            high: { label: t('myFieldsPage.cropDetails.levels.high') },
            medium: { label: t('myFieldsPage.cropDetails.levels.medium') },
          }}/>
        </Card>
      </TabsContent>
      <TabsContent value="nutrition">
        <Card>
          <CardHeader>
             <CardTitle className="text-base text-center">{t('myFieldsPage.cropDetails.nutrition.distributionTitle')}</CardTitle>
          </CardHeader>
          <FieldStatsChart chartData={nutritionData} height="200px" customChartConfig={{
            high: { label: t('myFieldsPage.cropDetails.levels.high') },
            medium: { label: t('myFieldsPage.cropDetails.levels.medium') },
          }} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
