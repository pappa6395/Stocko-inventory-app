"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { LineOrder } from "@prisma/client";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import OrderStatusBtn from "@/components/frontend/orders/OrderStatusBtn";
import { useState } from "react";

export const columns: ColumnDef<LineOrder>[] = [
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
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <SortableColumn column={column} title="Order Number" />
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Customer Name" />
    ),
  },
  {
    accessorKey: "status",
    header: "Order status",
    cell: ({ row }) => {
      const item = row.original;
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div onClick={() => setIsOpen(true)}>
          <OrderStatusBtn isOpen={isOpen} setIsOpen={setIsOpen} order={item}  />
        </div>
      )
    },
  },
  {
    accessorKey: "orderAmount",
    header: "Order Amount",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="">
          <h2 className="font-bold">${item.orderAmount?.toFixed(2)}</h2>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Order View",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div>
          <Button asChild>
            <Link href={`/dashboard/orders/${order.id}`}>View Order</Link>
          </Button>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => <StatusColumn row={row} accessorKey="status" />,
  // },

  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <ActionColumn
          row={row}
          model="category"
          revPath="/dashboard/inventory/categories"
          editEndpoint={`categories/update/${category.id}`}
          id={category.id}
        />
      );
    },
  },
];
