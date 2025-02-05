
import React from 'react'
import { columns } from './columns'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllUsers } from '@/actions/users'


const page = async () => {

  const users = (await getAllUsers()).data || [];

  return (

    <div>
        <TableHeader
        title="Customers"
        linkTitle="Add Customer"
        href="/dashboard/customers/new"
        data={users}
        model="customer"
      />
         <div className="py-8">
        <DataTable data={users} columns={columns} />
      </div>
    </div>

  )
}

export default page