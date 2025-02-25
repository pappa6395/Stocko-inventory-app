"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
 
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import StatusColumn from "@/components/dashboard/Table/dataTableColumns/StatusColumn";
import { ICustomer } from "@/type/types";
import Image from "next/image";
import { Sale } from "@prisma/client";
import { formatPrice } from "@/lib/formatPrice";


export const columns: ColumnDef<Sale>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const sale = row.original
      const fullName = sale.customerName || ""
      return <p>{fullName}</p>
    }
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ row }) => {
      const sale = row.original
      const email = sale.customerEmail || ""
      return <p>{email}</p>
    }
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      const sale= row.original
      const productName = sale.productName || ""
      //const productBrand = sale.
      return <p className="w-[20ch] overflow-scroll line-clamp-1">{productName}</p>
    }
  },
  {
    accessorKey: "SalePrice",
    header: "Price",
    cell: ({ row }) => {
      const sale = row.original
      const salePrice = sale.salePrice || 0
      return <p>${formatPrice(salePrice)}</p>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Purchaed Date",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <ActionColumn
          row={row}
          model="customer"
          editEndpoint={`customers/update/${customer.id}`}
          id={(customer.id)}
        />
      );
    },
  },
];