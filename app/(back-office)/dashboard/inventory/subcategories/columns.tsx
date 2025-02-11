"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
 
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import { ISubCategory } from "@/type/types";

export const columns: ColumnDef<ISubCategory>[] = [
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
    //accessorFn: (row) => row.category.title,   // Etracting string from array
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const subCategory = row.original.category?.title || "N/A"
      return <p>{subCategory}</p>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const subCategory = row.original;
      return (
        <ActionColumn
          row={row}
          model="subCategory"
          editEndpoint={`subcategories/update/${subCategory.id}`}
          id={(subCategory.id)}
        />
      );
    },
  },
];