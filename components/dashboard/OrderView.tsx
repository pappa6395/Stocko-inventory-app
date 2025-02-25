"use client"

import { ILineOrder } from '@/type/types'
import React from 'react'
import OrderInvoice from '../frontend/orders/OrderInvoice'
import FormHeader from './Forms/FormHeader'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'

type OrderViewProps = {
    order: ILineOrder | null,
    id: number,
}

const OrderView = (props: OrderViewProps) => {

    const { order, id } = props

    const contentRef = React.useRef<HTMLDivElement>(null)
    const router = useRouter()
    const handleBack = () => {
        router.back()
    } 

  return (

    <div>
        <div className='flex gap-3'>
            <Button 
                onClick={handleBack}
                variant="outline" 
                type="button"
                size="icon" 
                className="h-7 w-7"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Order Receipt
            </h1>
        </div>
        {order ? (
            <OrderInvoice order={order} contentRef={contentRef} />
        ) : (
            <div className='space-y-4'>
                <h2>Order not found in ID - {id}</h2>
            </div>
        )}
    </div>

  )
}

export default OrderView