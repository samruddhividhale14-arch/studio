'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import { DecisionSupport } from '@/components/dashboard/decision-support';
import { useLanguage } from '@/i18n/provider';

export default function DashboardPage() {
  const { t } = useLanguage();

  const fieldStats = [
    {
      title: t('dashboard.stats.avgTemp.title'),
      value: '25.4°C',
      icon: <Thermometer className="h-6 w-6 text-muted-foreground" />,
      change: t('dashboard.stats.avgTemp.change'),
    },
    {
      title: t('dashboard.stats.soilMoisture.title'),
      value: '58%',
      icon: <Droplets className="h-6 w-6 text-muted-foreground" />,
      change: t('dashboard.stats.soilMoisture.change'),
    },
    {
      title: t('dashboard.stats.sunlightHours.title'),
      value: '9.2h',
      icon: <Sun className="h-6 w-6 text-muted-foreground" />,
      change: t('dashboard.stats.sunlightHours.change'),
    },
    {
      title: t('dashboard.stats.windSpeed.title'),
      value: '12 km/h',
      icon: <Wind className="h-6 w-6 text-muted-foreground" />,
      change: t('dashboard.stats.windSpeed.change'),
    },
  ];
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

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {fieldStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DecisionSupport />
    </div>
  );
}
