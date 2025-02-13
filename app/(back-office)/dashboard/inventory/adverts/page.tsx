

import React from 'react'
import { columns } from './columns'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllAdverts } from '@/actions/adverts'


const page = async () => {

  const adverts = await getAllAdverts() || []

  return (

    <div>
        <TableHeader
        title="Adverts"
        linkTitle="Add Advert"
        href="/dashboard/inventory/adverts/new"
        data={adverts}
        model="advert"
      />
         <div className="py-8">
        <DataTable data={adverts} columns={columns} />
      </div>
    </div>

  )
}

export default page

function getAlladverts() {
  throw new Error('Function not implemented.')
}
