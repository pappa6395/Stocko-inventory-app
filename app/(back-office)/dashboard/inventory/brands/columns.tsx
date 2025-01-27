"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
 
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import ImageColumn from "@/components/dashboard/Table/dataTableColumns/ImageColumn";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import { Brand } from "@prisma/client";
import StatusColumn from "@/components/dashboard/Table/dataTableColumns/StatusColumn";
export const columns: ColumnDef<Brand>[] = [
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
    accessorKey: "imageUrl",
    header: "Brand Logo",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusColumn row={row} accessorKey={"status"} />,
  },
 
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <ActionColumn
          row={row}
          model="brand"
          editEndpoint={`brands/update/${brand.id}`}
          id={(brand.id)}
        />
      );
    },
  },
];