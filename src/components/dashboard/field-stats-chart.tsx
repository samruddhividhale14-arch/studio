'use client';

import *
as React from 'react';
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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

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
    <>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"#333"} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={"#333"} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#000" className="font-bold text-sm" dy={4}>
        {`${payload.label} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </>
  );
};

export function FieldStatsChart({ chartData: chartDataProp, height, customChartConfig }: { chartData?: typeof initialChartData, height?: string, customChartConfig?: any }) {
  const { t } = useLanguage();
  
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


  const activeMetric = chartData[0];

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
        <PieChart margin={{ top: 40, right: 120, bottom: 40, left: 120 }}>
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
            labelLine={false}
            label={renderCustomizedLabel}
          >
             {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
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
