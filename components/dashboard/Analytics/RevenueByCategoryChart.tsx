"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Cell, Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { MainCategoryRevenue } from "@/actions/analytics"
import { formatPrice } from "@/lib/formatPrice"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function RevenueByCategoryChart({categoryRevenue}: {categoryRevenue: MainCategoryRevenue[]}) {
    
    const generateChartConfig = (
        categoryRevenue: MainCategoryRevenue[]
      ): ChartConfig => {
        const colors = [
          "hsl(var(--chart-1))",
          "hsl(var(--chart-2))",
          "hsl(var(--chart-3))",
          "hsl(var(--chart-4))",
          "hsl(var(--chart-5))",
        ];
    
        const config: ChartConfig = {
          revenue: {
            label: "Revenue",
            color: "hsl(var(--chart-revenue))",
          },
        };
    
        categoryRevenue.forEach((category, index) => {
          const titleWords = category.title.split(" ");
          const mainCategoryKey = titleWords[0].toLowerCase(); // Use the first word of the title as the key
    
          config[mainCategoryKey] = {
            label: titleWords[0], // Label using the first word of the title
            color: colors[index % colors.length],
          };
        });
    
        return config;
      };

    const chartConfig = React.useMemo(
        () => generateChartConfig(categoryRevenue),
        [categoryRevenue]
      );
      console.log(chartConfig);
      const totalRevenue = React.useMemo(() => {
        return categoryRevenue.reduce((acc, curr) => acc + curr.revenue, 0);
      }, []);
    

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={categoryRevenue}
              dataKey="revenue"
              nameKey="title"
              innerRadius={60}
              strokeWidth={5}
            >
             {categoryRevenue.map((entry, index) => {
                const titleWords = entry.title.split(" ");
                const mainCategoryKey = titleWords[0].toLowerCase(); // Ensure key consistency

                return (
                <Cell key={index} fill={chartConfig[mainCategoryKey]?.color || "#ccc"} />
                );
            })}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ${formatPrice(totalRevenue)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
