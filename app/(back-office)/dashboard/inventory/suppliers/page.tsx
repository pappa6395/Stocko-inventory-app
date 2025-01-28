
import React from 'react'
import { columns } from './columns'
import { Supplier } from '@prisma/client'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllSuppliers } from '@/actions/suppliers'


const page = async () => {

  const suppliers = await getAllSuppliers() as Supplier[]

  return (

    <div>
        <TableHeader
        title="Suppliers"
        linkTitle="Add Supplier"
        href="/dashboard/inventory/suppliers/new"
        data={suppliers}
        model="supplier"
      />
         <div className="py-8">
        <DataTable data={suppliers} columns={columns} />
      </div>
    </div>

  )
}

export default page