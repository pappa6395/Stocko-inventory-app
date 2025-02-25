

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/sales/customers/page'
import { getOrdersByOrderPagination } from '@/actions/orders'
import OrderHistory from '@/components/dashboard/OrderHistory'
import OrderPagination from '@/components/frontend/orders/OrderPagination'
import React from 'react'


const page = async ({params: paramsPromise, searchParams: searchParamsPromise}: PageProps) => {

    const { id } = await paramsPromise
    const { page = 1 } = await searchParamsPromise
    const pageSize = 10 as number
    const customerId = Number(id)
    const pageNumber = Number(page)
    const response = (await getOrdersByOrderPagination(customerId, pageNumber, pageSize)) || [];
    const orders = response.data?.orders || [];
    const totalCount = response.data?.totalCount || 0;
    const totalPages = response.data?.totalPages || 0;
    
    const startRange = (Number(page) - 1) * pageSize + 1;
    const endRange = Math.min(startRange + pageSize - 1, totalCount);
    

  return (

    <div>
        <OrderHistory orders={orders} />
        <div className='flex justify-between mx-4 px-2'>
          <h2>Orders</h2>
          <p>Showing {startRange} - {endRange} of {totalCount} orders</p>
        </div>
        <div>
          <OrderPagination totalPages={totalPages} />
        </div>
    </div>

  )
}

export default page