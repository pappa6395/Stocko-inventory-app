
import React from 'react'
import { columns } from './columns'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllProducts } from '@/actions/products'


const page = async () => {

  const products = await getAllProducts() || []

  return (

    <div>
        <TableHeader
        title="Products"
        linkTitle="Add Product"
        href="/dashboard/inventory/products/new"
        data={products}
        model="product"
      />
         <div className="py-8">
        <DataTable data={products} columns={columns} />
      </div>
    </div>

  )
}

export default page