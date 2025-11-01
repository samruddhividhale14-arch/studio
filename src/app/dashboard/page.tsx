import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import { DecisionSupport } from '@/components/dashboard/decision-support';

const fieldStats = [
  {
    title: 'Avg. Temperature',
    value: '25.4°C',
    icon: <Thermometer className="h-6 w-6 text-muted-foreground" />,
    change: '+1.2°C from yesterday',
    changeType: 'increase',
  },
  {
    title: 'Soil Moisture',
    value: '58%',
    icon: <Droplets className="h-6 w-6 text-muted-foreground" />,
    change: '-3% from last irrigation',
    changeType: 'decrease',
  },
  {
    title: 'Sunlight Hours',
    value: '9.2h',
    icon: <Sun className="h-6 w-6 text-muted-foreground" />,
    change: '+0.5h from yesterday',
    changeType: 'increase',
  },
  {
    title: 'Wind Speed',
    value: '12 km/h',
    icon: <Wind className="h-6 w-6 text-muted-foreground" />,
    change: 'Consistent',
    changeType: 'neutral',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome back, John!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a quick overview of your farm&apos;s status.
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
