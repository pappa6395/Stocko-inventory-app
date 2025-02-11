
import { getAllCategories } from '@/actions/category'
import React from 'react'
import { columns } from './columns'
import { Category, MainCategory } from '@prisma/client'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllMainCategories } from '@/actions/main-categories'


const page = async () => {

  const mainCategories = await getAllMainCategories() as MainCategory[]

  return (

    <div>
        <TableHeader
        title="Main Categories"
        linkTitle="Add Main Category"
        href="/dashboard/inventory/main-categories/new"
        data={mainCategories}
        model="mainCategory"
      />
         <div className="py-8">
        <DataTable data={mainCategories} columns={columns} />
      </div>
    </div>

  )
}

export default page