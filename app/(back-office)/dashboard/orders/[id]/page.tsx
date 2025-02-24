import { PageProps } from '@/.next/types/app/(back-office)/layout'
import { getOrderById } from '@/actions/orders'
import OrderView from '@/components/dashboard/OrderView'
import OrderInvoice from '@/components/frontend/orders/OrderInvoice'
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise
    const userId = Number(id)
    const order = (await (getOrderById(userId))).data || null
    

  return (

    <div>
        <OrderView order={order} id={userId} />
    </div>

  )
}

export default page