import { Badge } from '@/components/ui/badge'
import React from 'react'

const StatusColumn = ({
    row, 
    accessorKey
}: {
    row: any; 
    accessorKey: any;
}) => {

    const status = row.getValue(`${accessorKey}`);

  return (

    <Badge variant={status=== true ? "active" : "disabled"}>
        <span>{status ? "Active" : "Disabled"}</span>
    </Badge>

  )
}

export default StatusColumn