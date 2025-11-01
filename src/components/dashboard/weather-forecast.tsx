'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/i18n/provider';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

const hourlyData = [
    { time: '10:00', icon: <Sun className="h-6 w-6 text-yellow-400" />, temp: '28°C' },
    { time: '11:00', icon: <Sun className="h-6 w-6 text-yellow-400" />, temp: '29°C' },
    { time: '12:00', icon: <Cloud className="h-6 w-6 text-gray-400" />, temp: '29°C' },
    { time: '13:00', icon: <CloudRain className="h-6 w-6 text-blue-400" />, temp: '27°C' },
    { time: '14:00', icon: <CloudRain className="h-6 w-6 text-blue-400" />, temp: '26°C' },
    { time: '15:00', icon: <Cloud className="h-6 w-6 text-gray-400" />, temp: '27°C' },
    { time: '16:00', icon: <Sun className="h-6 w-6 text-yellow-400" />, temp: '28°C' },
];

export function WeatherForecast() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{t('dashboard.weather.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
                <Sun className="h-12 w-12 text-yellow-400" />
                <div>
                    <div className="text-4xl font-bold">28°C</div>
                    <div className="text-muted-foreground">{t('dashboard.weather.current')}</div>
                </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Wind className="h-5 w-5" />
                <span>12 km/h</span>
            </div>
        </div>
        <div>
            <h4 className="font-semibold mb-2">{t('dashboard.weather.hourlyForecast')}</h4>
            <div className="flex justify-between overflow-x-auto gap-4 py-2">
                {hourlyData.map((hour, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 min-w-[60px]">
                        <span className="text-sm text-muted-foreground">{hour.time}</span>
                        {hour.icon}
                        <span className="font-semibold">{hour.temp}</span>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
