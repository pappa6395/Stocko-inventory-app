
import React from 'react'

import { Brand } from '@prisma/client'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { columns } from './columns'
import { getAllBrands } from '@/actions/brand'


const page = async () => {

  const brands = await getAllBrands() as Brand[]

  return (

    <div>
        <TableHeader
        title="Brands"
        linkTitle="Add Brand"
        href="/dashboard/inventory/brands/new"
        data={brands}
        model="brand"
      />
         <div className="py-8">
        <DataTable data={brands} columns={columns} />
      </div>
    </div>

  )
}

export default page