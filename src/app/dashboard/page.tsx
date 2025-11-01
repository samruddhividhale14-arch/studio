'use client';

import { WeatherForecast } from '@/components/dashboard/weather-forecast';
import { FieldStatsChart } from '@/components/dashboard/field-stats-chart';
import { useLanguage } from '@/i18n/provider';

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          {t('dashboard.welcome')}
        </h1>
        <p className="text-muted-foreground">
          {t('dashboard.description')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
        <WeatherForecast />
        <FieldStatsChart />
      </div>
    </div>
  );
}
