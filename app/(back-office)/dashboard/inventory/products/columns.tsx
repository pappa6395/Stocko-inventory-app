"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
 
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import ImageColumn from "@/components/dashboard/Table/dataTableColumns/ImageColumn";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import { Products } from "@prisma/client";
import StatusColumn from "@/components/dashboard/Table/dataTableColumns/StatusColumn";

export interface IProducts extends Products {
  
  id: number;
  name: string;
  subCategory: { title: string };
}

export const columns: ColumnDef<IProducts>[] = [
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
    accessorKey: "productThumbnail",
    header: "Product Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="productThumbnail" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "productCode",
    header: ({ column }) => <SortableColumn column={column} title="Product code" />,
  },
  {
    //accessorFn: (row) => row.category.title,   // Etracting string from array
    accessorKey: "subCategory",
    header: "Sub Category",
    cell: ({ row }) => {
      const subCategory = row.original?.subCategory.title || "N/A"
      return <p>{subCategory}</p>
    }
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
      const product = row.original;
      return (
        <ActionColumn
          row={row}
          model="product"
          editEndpoint={`products/update/${product.id}`}
          id={(product.id)}
        />
      );
    },
  },
];