
import React from 'react'

import { Unit } from '@prisma/client'
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import DataTable from '@/components/dashboard/Table/dataTableComponents/DataTable'
import { columns } from './columns'
import { getAllUnits } from '@/actions/units'


const page = async () => {

  const units = await getAllUnits() as Unit[]

  return (

    <div>
        <TableHeader
        title="Units"
        linkTitle="Add Unit"
        href="/dashboard/inventory/units/new"
        data={units}
        model="unit"
      />
         <div className="py-8">
        <DataTable data={units} columns={columns} />
      </div>
    </div>

  )
}

export default page