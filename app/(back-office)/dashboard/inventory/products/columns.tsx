"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
 
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import ImageColumn from "@/components/dashboard/Table/dataTableColumns/ImageColumn";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import StatusColumn from "@/components/dashboard/Table/dataTableColumns/StatusColumn";
import { IProducts } from "@/type/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";


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
    //accessorFn: (row) => row.category.title,   // Etracting string from array
    accessorKey: "brand",
    header: "Brand Name",
    cell: ({ row }) => {
      const brand = row.original?.brand.title || "N/A"
      return <p>{brand}</p>
    }
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
    accessorKey: "stockQty",
    header: "Stock",
    cell: ({ row }) => {
      const product = row.original;

      return <h2>{product.stockQty}</h2>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusColumn row={row} accessorKey={"status"} />,
  },
  {
    accessorKey: "productDetails",
    header: "View",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Button asChild variant={"outline"} size={"sm"}>
          <Link href={`/dashboard/inventory/products/${product.id}`}>
            View{" "}
          </Link>
        </Button>
      );
    },
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