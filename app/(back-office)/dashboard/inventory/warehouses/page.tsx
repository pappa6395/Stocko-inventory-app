
import React from 'react'
import { columns } from './columns'
import { Warehouse } from '@prisma/client'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllWarehouses } from '@/actions/warehouses'


const page = async () => {

  const warehouses = await getAllWarehouses() as Warehouse[]

  return (

    <div>
        <TableHeader
        title="Warehouses"
        linkTitle="Add Warehouse"
        href="/dashboard/inventory/warehouses/new"
        data={warehouses}
        model="warehouse"
      />
         <div className="py-8">
        <DataTable data={warehouses} columns={columns} />
      </div>
    </div>

  )
}

export default page