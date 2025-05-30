
import React from 'react'
import { columns } from './column'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllSales } from '@/actions/sales'


const page = async () => {

  const sales = (await getAllSales())?.data || [];

  return (

    <div>
        <TableHeader
        title="Sales"
        linkTitle="Add Sale"
        href="#"
        data={sales}
        model="customer"
      />
      <div className="py-8">
        <DataTable tableTitle="sales" data={sales} columns={columns} />
      </div>
    </div>

  )
}

export default page