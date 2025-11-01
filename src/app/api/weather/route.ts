import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '28.6139'; // Default to Delhi
  const lon = searchParams.get('lon') || '77.2090';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenWeather API key is not configured.' }, { status: 500 });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const hourlyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=7&appid=${apiKey}`;

  try {
    const [weatherResponse, hourlyResponse] = await Promise.all([
      fetch(url),
      fetch(hourlyUrl)
    ]);
    
    if (!weatherResponse.ok || !hourlyResponse.ok) {
        const weatherError = !weatherResponse.ok ? await weatherResponse.json() : null;
        const hourlyError = !hourlyResponse.ok ? await hourlyResponse.json() : null;
        console.error('OpenWeatherMap API Error:', { weatherError, hourlyError });
        throw new Error('Failed to fetch weather data from OpenWeatherMap.');
    }

    const weatherData = await weatherResponse.json();
    const hourlyData = await hourlyResponse.json();

    const response = {
        current: {
            temp: weatherData.main.temp,
            description: weatherData.weather[0].main,
            icon: weatherData.weather[0].icon,
            windSpeed: weatherData.wind.speed,
        },
        hourly: hourlyData.list.map((item: any) => ({
            time: new Date(item.dt * 1000).getHours() + ':00',
            temp: item.main.temp,
            description: item.weather[0].main,
            icon: item.weather[0].icon,
        })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data.' }, { status: 500 });
  }
}
