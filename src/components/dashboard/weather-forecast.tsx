'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/i18n/provider';
import { Sun, Cloud, CloudRain, Wind, Loader2, AlertTriangle, CloudSnow, Haze } from 'lucide-react';
import { useEffect, useState } from 'react';

const weatherIconMap: { [key: string]: React.ReactNode } = {
  'Clear': <Sun className="h-6 w-6 text-yellow-400" />,
  'Clouds': <Cloud className="h-6 w-6 text-gray-400" />,
  'Rain': <CloudRain className="h-6 w-6 text-blue-400" />,
  'Drizzle': <CloudRain className="h-6 w-6 text-blue-300" />,
  'Snow': <CloudSnow className="h-6 w-6 text-white" />,
  'Mist': <Haze className="h-6 w-6 text-gray-300" />,
  'Haze': <Haze className="h-6 w-6 text-gray-300" />,
  'default': <Sun className="h-6 w-6 text-yellow-400" />,
};

const getWeatherIcon = (description: string) => {
    return weatherIconMap[description] || weatherIconMap.default;
}

const MainWeatherIcon = ({ description }: { description: string }) => {
    const icon = weatherIconMap[description] || weatherIconMap.default;
    return <div className='h-12 w-12'>{React.cloneElement(icon as React.ReactElement, { className: 'h-12 w-12' })}</div>;
}


interface WeatherData {
    current: {
        temp: number;
        description: string;
        windSpeed: number;
    };
    hourly: {
        time: string;
        temp: number;
        description: string;
    }[];
}

export function WeatherForecast() {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setWeather(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch weather", err);
                    setError(t('dashboard.weather.error'));
                })
                .finally(() => setLoading(false));
        },
        (error) => {
             console.error("Geolocation error", error);
             // Fetch with default location if user denies geolocation
             fetch('/api/weather')
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setWeather(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch weather", err);
                    setError(t('dashboard.weather.error'));
                })
                .finally(() => setLoading(false));
        }
    );
  }, [t]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{t('dashboard.weather.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
            <div className='flex items-center justify-center h-48'>
                <Loader2 className="h-10 w-10 animate-spin" />
            </div>
        ) : error ? (
            <div className='flex flex-col items-center justify-center h-48 text-destructive'>
                <AlertTriangle className="h-10 w-10 mb-2" />
                <p>{error}</p>
            </div>
        ) : weather ? (
          <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <MainWeatherIcon description={weather.current.description} />
                    <div>
                        <div className="text-4xl font-bold">{Math.round(weather.current.temp)}°C</div>
                        <div className="text-muted-foreground">{weather.current.description}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Wind className="h-5 w-5" />
                    <span>{weather.current.windSpeed.toFixed(1)} m/s</span>
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">{t('dashboard.weather.hourlyForecast')}</h4>
                <div className="flex justify-between overflow-x-auto gap-4 py-2">
                    {weather.hourly.map((hour, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 min-w-[60px]">
                            <span className="text-sm text-muted-foreground">{hour.time}</span>
                            {getWeatherIcon(hour.description)}
                            <span className="font-semibold">{Math.round(hour.temp)}°C</span>
                        </div>
                    ))}
                </div>
            </div>
          </>
        ) : null }
      </CardContent>
    </Card>
  );
}
