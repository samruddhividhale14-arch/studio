'use client';

import *
as React from 'react';
import { Pie, PieChart, Sector } from 'recharts';
import { Droplets, Sun, Thermometer, Wind } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useLanguage } from '@/i18n/provider';

const initialChartData = [
  { metric: 'avgTemp', value: 25.4, fill: 'hsl(var(--chart-1))', icon: Thermometer },
  { metric: 'soilMoisture', value: 58, fill: 'hsl(var(--chart-2))', icon: Droplets },
  { metric: 'sunlightHours', value: 9.2, fill: 'hsl(var(--chart-3))', icon: Sun },
  { metric: 'windSpeed', value: 12, fill: 'hsl(var(--chart-4))', icon: Wind },
];

const chartConfig = {
  value: {
    label: 'Value',
  },
  avgTemp: {
    label: 'Avg. Temp',
    color: 'hsl(var(--chart-1))',
  },
  soilMoisture: {
    label: 'Soil Moisture',
    color: 'hsl(var(--chart-2))',
  },
  sunlightHours: {
    label: 'Sunlight',
    color: 'hsl(var(--chart-3))',
  },
  windSpeed: {
    label: 'Wind Speed',
    color: 'hsl(var(--chart-4))',
  },
};

const ActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const Icon = payload.icon;


  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-2xl font-bold">
        {payload.value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="hsl(var(--foreground))" className="text-sm">{chartConfig[payload.metric as keyof typeof chartConfig].label}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="hsl(var(--muted-foreground))" className="text-xs">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


export function FieldStatsChart() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  
  const chartData = React.useMemo(() => {
    return initialChartData.map(item => ({
      ...item,
      label: t(`dashboard.stats.${item.metric}.title`),
    }));
  }, [t]);


  const activeMetric = chartData[activeIndex];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t('dashboard.fieldSummary')}</CardTitle>
        <CardDescription>{t('dashboard.fieldSummaryDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              activeIndex={activeIndex}
              activeShape={ActiveShape}
              onMouseEnter={onPieEnter}
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={80}
              outerRadius={110}
              strokeWidth={2}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardContent className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <activeMetric.icon className="h-5 w-5" />
        <div>{t(`dashboard.stats.${activeMetric.metric}.change`)}</div>
      </CardContent>
    </Card>
  );
}