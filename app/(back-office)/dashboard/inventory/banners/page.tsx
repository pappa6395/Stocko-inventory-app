
import React from 'react'
import { columns } from './columns'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { getAllBanners } from '@/actions/banners'


const page = async () => {

  const banners = await getAllBanners() || []

  return (

    <div>
        <TableHeader
        title="Banners"
        linkTitle="Add Banner"
        href="/dashboard/inventory/banners/new"
        data={banners}
        model="banner"
      />
         <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>

  )
}

export default page