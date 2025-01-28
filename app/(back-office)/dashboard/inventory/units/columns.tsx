"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
 
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import { Unit } from "@prisma/client";

export const columns: ColumnDef<Unit>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "abbreviation",
    header: ({ column }) => <SortableColumn column={column} title="Abbreviation" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unit = row.original;
      return (
        <ActionColumn
          row={row}
          model="unit"
          editEndpoint={`units/update/${unit.id}`}
          id={(unit.id)}
        />
      );
    },
  },
];