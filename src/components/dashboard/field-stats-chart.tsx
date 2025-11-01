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

const chartConfig = {
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
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
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
        {`${value}%`}
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
        {`${(percent * 100).toFixed(0)}% of fields`}
      </text>
    </g>
  );
};


export function FieldStatsChart({ chartData: chartDataProp, height }: { chartData?: typeof initialChartData, height?: string }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  
  const chartData = React.useMemo(() => {
    const data = chartDataProp || initialChartData;
    return data.map(item => ({
      ...item,
      label: t(`dashboard.fieldStatus.${item.metric}.title`),
    }));
  }, [t, chartDataProp]);


  const activeMetric = chartData[activeIndex];

  if (!activeMetric) {
    return null;
  }

  const ActiveIcon = chartConfig[activeMetric.metric as keyof typeof chartConfig].icon;

  const content = (
    <>
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
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
            activeShape={ActiveShape}
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
    <CardContent className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <ActiveIcon className="h-5 w-5" />
      <div>{t(`dashboard.fieldStatus.${activeMetric.metric}.description`)}</div>
    </CardContent>
    </>
  );

  if (chartDataProp) {
    return content;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t('dashboard.fieldStatusSummary')}</CardTitle>
        <CardDescription>{t('dashboard.fieldStatusSummaryDescription')}</CardDescription>
      </CardHeader>
      {content}
    </Card>
  );
}
