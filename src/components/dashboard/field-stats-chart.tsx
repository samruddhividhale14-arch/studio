'use client';

import * as React from 'react';
import { Pie, PieChart, Sector, Cell } from 'recharts';
import { Leaf, AlertTriangle, Droplets } from 'lucide-react';

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
  { metric: 'healthy', value: 70, fill: 'hsl(var(--chart-1))' },
  { metric: 'deficient', value: 20, fill: 'hsl(var(--chart-2))' },
  { metric: 'stressed', value: 10, fill: 'hsl(var(--chart-3))' },
];

const defaultChartConfig = {
  value: {
    label: 'Fields',
  },
  healthy: {
    label: 'Healthy',
    color: 'hsl(var(--chart-1))',
    icon: Leaf,
  },
  deficient: {
    label: 'Deficient',
    color: 'hsl(var(--chart-2))',
    icon: Droplets,
  },
  stressed: {
    label: 'Stressed',
    color: 'hsl(var(--chart-3))',
    icon: AlertTriangle,
  },
};

export function FieldStatsChart({ chartData: chartDataProp, height, customChartConfig }: { chartData?: typeof initialChartData, height?: string, customChartConfig?: any }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  const chartConfig = { ...defaultChartConfig, ...customChartConfig };

  const chartData = React.useMemo(() => {
    const data = chartDataProp || initialChartData;
    if (customChartConfig) {
      return data.map((item) => ({...item, label: chartConfig[item.metric as keyof typeof chartConfig]?.label}));
    }
    return data.map(item => ({
      ...item,
      label: t(`dashboard.fieldStatus.${item.metric}.title`),
    }));
  }, [t, chartDataProp, customChartConfig, chartConfig]);


  const onPieEnter = React.useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, [setActiveIndex]);

  const activeMetric = chartData[activeIndex];

  if (!activeMetric) {
    return null;
  }
  
  const activeMetricConfig = chartConfig[activeMetric.metric as keyof typeof chartConfig];
  const ActiveIcon = activeMetricConfig?.icon;

  const totalValue = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [chartData]
  );


  const content = (
    <>
    <CardContent className="flex-1 flex items-center justify-center pb-0">
      <ChartContainer
        config={chartConfig as any}
        className="mx-auto aspect-square"
        style={{ height: height || '300px' }}
      >
        <PieChart>
          <ChartTooltip
            cursor={true}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={height ? 30 : 60}
            outerRadius={height ? 50 : 80}
            strokeWidth={2}
            activeIndex={activeIndex}
            onMouseEnter={onPieEnter}
          >
             {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
           <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-2xl font-bold"
            >
              {`${(chartData[activeIndex].value / totalValue * 100).toFixed(0)}%`}
            </text>
        </PieChart>
      </ChartContainer>
    </CardContent>
    {ActiveIcon && !customChartConfig && (
        <CardContent className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
        <ActiveIcon className="h-5 w-5" />
        <div>{t(`dashboard.fieldStatus.${activeMetric.metric}.description`)}</div>
        </CardContent>
    )}
    </>
  );

  if (chartDataProp) {
    return content;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className='font-bold'>{t('dashboard.fieldStatusSummary')}</CardTitle>
        <CardDescription>{t('dashboard.fieldStatusSummaryDescription')}</CardDescription>
      </CardHeader>
      {content}
    </Card>
  );
}
