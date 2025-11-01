'use client';

import { WeatherForecast } from '@/components/dashboard/weather-forecast';
import { FieldStatsChart } from '@/components/dashboard/field-stats-chart';
import { useLanguage } from '@/i18n/provider';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { Farmer } from '@/models/farmer';
import { doc } from 'firebase/firestore';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useUser();
  const firestore = useFirestore();

  const farmerDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid, 'farmers', user.uid);
  }, [firestore, user]);

  const { data: farmer } = useDoc<Farmer>(farmerDocRef);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          {t('dashboard.welcome').replace('John', farmer?.name || 'Friend')}
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
