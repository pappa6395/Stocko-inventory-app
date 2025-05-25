"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { IProducts } from "@/type/types";
import { formatMoney } from "@/lib/formatMoney";
import ImageColumn from "@/components/dashboard/Table/dataTableColumns/ImageColumn";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";


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
    header: ({ column }) => (
      <SortableColumn column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "subCategory",
    header: "Sub Category",
    cell: ({ row }) => {
      const product = row.original;
      const subCategory = product.subCategory.title;
      return <h2>{subCategory}</h2>;
    },
  },
  {
    accessorKey: "stockQty",
    header: "Current Stock",
    cell: ({ row }) => {
      const product = row.original;

      return <h2>{product.stockQty}</h2>;
    },
  },
  {
    accessorKey: "alertQuantity",
    header: "Stock Value",
    cell: ({ row }) => {
      const product = row.original;
      const value = product.stockQty * product.productPrice;

      return <h2>{formatMoney(value)}</h2>;
    },
  },
];
