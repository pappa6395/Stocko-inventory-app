
import React from 'react'
import { columns } from './columns'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllCustomers } from '@/actions/customers'


const page = async () => {

  const customers = (await getAllCustomers())?.data || [];

  return (

    <div>
        <TableHeader
        title="Customers"
        linkTitle="Add Customer"
        href="/dashboard/sales/customers/new"
        data={customers}
        model="customer"
      />
      <div className="py-8">
        <DataTable data={customers} columns={columns} />
      </div>
    </div>

  )
}

export default page