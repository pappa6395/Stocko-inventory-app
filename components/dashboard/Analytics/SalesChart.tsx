"use client"

import { ExternalLink, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
import { DailySales } from "@/actions/analytics"
import { format, subDays } from "date-fns"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Tooltip from "@/components/global/Tooltip"


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function SalesChart({sales}: {sales: DailySales[]}) {

    const now = new Date();
    const sevenDaysAgo = subDays(now, 6);
    const startDate = format(sevenDaysAgo, 'EEE do MMM');
    const endDate = format(now, 'EEE do MMM');
    let highestsaleDay: DailySales = { day: "", sales: 0 };
    sales.forEach(salesDay => {
        if (salesDay.sales > highestsaleDay.sales) {
          highestsaleDay = salesDay;
        }
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
            <div>
                <CardTitle>Sales Chart</CardTitle>
                <CardDescription>{startDate} - {endDate}</CardDescription>
            </div>
            <div className="relative group">
                <Button asChild variant={"outline"} className="ml-auto" size="sm">
                    <Link href={`/dashboard/analytics/sales`}>
                        <span className="sr-only" >View All</span>
                        <ExternalLink />
                    </Link>
                </Button>
                <Tooltip label="View All" className="text-xs" />
            </div>
        </div>    
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart 
            accessibilityLayer 
            data={sales}
            margin={{ top: 22, right: 12, left: 12, bottom: 0 }}
            >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" fill="var(--color-desktop)" radius={8}>
                <LabelList  
                    position="top"
                    offset={12} 
                    className="fill-foreground"
                    fontSize={12}
                />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className=" gap-2 font-medium leading-none space-y-2">
            <p>The day with highest sales is {highestsaleDay.day}</p> 
            <p className="flex gap-2">
                <TrendingUp className="h-4 w-4" />
                with {highestsaleDay.sales} sales 
            </p>
        </div>
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last 7 days including today
        </div>
      </CardFooter>
    </Card>
  )
}
