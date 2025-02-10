
import { getAllCategories } from '@/actions/category'
import React from 'react'
import { columns } from './columns'
import { Category } from '@prisma/client'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'


const page = async () => {

  const categories = await getAllCategories() as Category[]

  return (

    <div>
        <TableHeader
        title="SubCategories"
        linkTitle="Add SubCategory"
        href="/dashboard/inventory/subcategories/new"
        data={categories}
        model="subCategory"
      />
         <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>

  )
}

export default page