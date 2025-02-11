
import { getAllCategories } from '@/actions/category'
import React from 'react'
import { columns } from './columns'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'


const page = async () => {

  const categories = await getAllCategories() || []

  return (

    <div>
        <TableHeader
        title="Categories"
        linkTitle="Add Category"
        href="/dashboard/inventory/categories/new"
        data={categories}
        model="category"
      />
         <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>

  )
}

export default page