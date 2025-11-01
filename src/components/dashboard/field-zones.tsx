'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldStatsChart } from './field-stats-chart';
import { useLanguage } from '@/i18n/provider';
import { CropDetailsTabs } from './crop-details-tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CropRecommendations } from './crop-recommendations';

const zoneData = [
  { 
    zone: 'zoneA',
    cropType: 'Corn',
    data: [
      { metric: 'healthy', value: 80, fill: 'hsl(var(--chart-1))' },
      { metric: 'deficient', value: 15, fill: 'hsl(var(--chart-2))' },
      { metric: 'stressed', value: 5, fill: 'hsl(var(--chart-3))' },
    ]
  },
  { 
    zone: 'zoneB',
    cropType: 'Soybean',
    data: [
      { metric: 'healthy', value: 60, fill: 'hsl(var(--chart-1))' },
      { metric: 'deficient', value: 25, fill: 'hsl(var(--chart-2))' },
      { metric: 'stressed', value: 15, fill: 'hsl(var(--chart-3))' },
    ]
  },
  {
    zone: 'zoneC',
    cropType: 'Wheat',
    data: [
      { metric: 'healthy', value: 50, fill: 'hsl(var(--chart-1))' },
      { metric: 'deficient', value: 30, fill: 'hsl(var(--chart-2))' },
      { metric: 'stressed', value: 20, fill: 'hsl(var(--chart-3))' },
    ]
  },
];

export function FieldZones() {
    const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{t('myFieldsPage.zones.title')}</CardTitle>
        <CardDescription>
          {t('myFieldsPage.zones.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {zoneData.map(({ zone, data, cropType }) => (
          <div key={zone} className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-center mb-2">{t(`myFieldsPage.zones.${zone}`)}</h3>
            <FieldStatsChart chartData={data} height="250px" />
            <Tabs defaultValue='details' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='details'>{t('myFieldsPage.tabs.details')}</TabsTrigger>
                <TabsTrigger value='recommendations'>{t('myFieldsPage.tabs.recommendations')}</TabsTrigger>
              </TabsList>
              <TabsContent value='details'>
                <CropDetailsTabs />
              </TabsContent>
              <TabsContent value='recommendations'>
                <CropRecommendations zoneId={zone} cropType={cropType} />
              </TabsContent>
            </Tabs>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
