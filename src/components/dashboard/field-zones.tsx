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

const zoneData = [
  { 
    zone: 'zoneA', 
    data: [
      { metric: 'healthy', value: 80, fill: 'hsl(var(--chart-1))' },
      { metric: 'deficient', value: 15, fill: 'hsl(var(--chart-2))' },
      { metric: 'stressed', value: 5, fill: 'hsl(var(--chart-3))' },
    ]
  },
  { 
    zone: 'zoneB',
    data: [
      { metric: 'healthy', value: 60, fill: 'hsl(var(--chart-1))' },
      { metric: 'deficient', value: 25, fill: 'hsl(var(--chart-2))' },
      { metric: 'stressed', value: 15, fill: 'hsl(var(--chart-3))' },
    ]
  },
  {
    zone: 'zoneC',
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
        {zoneData.map(({ zone, data }) => (
          <div key={zone}>
             <h3 className="text-lg font-semibold text-center mb-2">{t(`myFieldsPage.zones.${zone}`)}</h3>
            <FieldStatsChart chartData={data} height="250px" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
