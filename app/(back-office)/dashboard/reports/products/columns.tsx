"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {
  Products as PrismaProduct,
  PurchaseOrder,
  PurchaseOrderItem,
  Sale,
  SubCategory,
} from "@prisma/client";
import { formatMoney } from "@/lib/formatMoney";
import ImageColumn from "@/components/dashboard/Table/dataTableColumns/ImageColumn";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";

interface IProduct extends PrismaProduct {
  sale: Sale[];
  subCategory: SubCategory;
  purchaseOrders: PurchaseOrderItem[];
}
export const columns: ColumnDef<IProduct>[] = [
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
    accessorKey: "alertQuantity",
    header: "Qty Sold",
    cell: ({ row }) => {
      const product = row.original;
      const sales = product.sale.reduce((acc, item) => {
        return acc + item.qty;
      }, 0);
      return <h2>{sales}</h2>;
    },
  },
  {
    accessorKey: "stockQty",
    header: "Amount Sold",
    cell: ({ row }) => {
      const product = row.original;
      const total = product.sale.reduce((acc, item) => {
        return acc + item.qty * item.salePrice;
      }, 0);
      // console.log(sales);
      return <h2>{formatMoney(total)}</h2>;
    },
  },
  {
    accessorKey: "saleUnit",
    header: "Qty Purchased",
    cell: ({ row }) => {
      const product = row.original;
      const qty = product.purchaseOrders.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);

      return <h2>{qty}</h2>;
    },
  },
  {
    accessorKey: "purchasedOrders",
    header: "Total Purchased",
    cell: ({ row }) => {
      const product = row.original;
      const total = product.purchaseOrders.reduce((acc, item) => {
        return acc + item.subTotal;
      }, 0);

      return <h2>{total}</h2>;
    },
  },
];
