
import React from 'react'
import { columns } from './columns'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllSubCategories } from '@/actions/subCategories'


const page = async () => {

  const subCategories = await getAllSubCategories() || []

  return (

    <div>
        <TableHeader
        title="SubCategories"
        linkTitle="Add SubCategory"
        href="/dashboard/inventory/subcategories/new"
        data={subCategories}
        model="subCategory"
      />
         <div className="py-8">
        <DataTable data={subCategories} columns={columns} />
      </div>
    </div>

  )
}

export default page