'use client';

import *
as React from 'react';
import { Pie, PieChart, Sector } from 'recharts';
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

const ActiveShape = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, chartConfig } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-2xl font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 14}
        fill={fill}
      />
    </g>
  );
};


export function FieldStatsChart({ chartData: chartDataProp, height, customChartConfig }: { chartData?: typeof initialChartData, height?: string, customChartConfig?: any }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const chartConfig = { ...defaultChartConfig, ...customChartConfig };

  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  
  const chartData = React.useMemo(() => {
    const data = chartDataProp || initialChartData;
    if (customChartConfig) {
      return data;
    }
    return data.map(item => ({
      ...item,
      label: t(`dashboard.fieldStatus.${item.metric}.title`),
    }));
  }, [t, chartDataProp, customChartConfig]);


  const activeMetric = chartData[activeIndex];

  if (!activeMetric) {
    return null;
  }
  
  const activeMetricConfig = chartConfig[activeMetric.metric as keyof typeof chartConfig];
  const ActiveIcon = activeMetricConfig?.icon;

  const content = (
    <>
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig as any}
        className="mx-auto aspect-square"
        style={{ height: height || '300px' }}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            activeIndex={activeIndex}
            activeShape={(props: any) => <ActiveShape {...props} chartConfig={chartConfig} />}
            onMouseEnter={onPieEnter}
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={height ? 50 : 80}
            outerRadius={height ? 70 : 110}
            strokeWidth={2}
          />
        </PieChart>
      </ChartContainer>
    </CardContent>
    {ActiveIcon && !customChartConfig && (
        <CardContent className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
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
