import { AnalyticsProps } from '@/actions/analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const AnalyticCard = ({data}: {data: AnalyticsProps}) => {

    const Icon = data.icon
    const Unit = data.unit

  return (

    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
            {data.title}
        </CardTitle>
        <Icon className="w-6 h-6 text-gray-400" />
        </CardHeader>
        <CardContent>
        <div className="flex items-center gap-1 text-2xl font-bold">
            {Unit && <Unit className="size-5 text-muted-foreground"/>}
            {data.salesCount?.toString().padStart(3,"0") || 0}
        </div>
        <Link href={data.detailLink} className="text-xs text-muted-foreground">
            <span>View Detail</span>
        </Link>
        </CardContent>
    </Card>

  )
}

export default AnalyticCard