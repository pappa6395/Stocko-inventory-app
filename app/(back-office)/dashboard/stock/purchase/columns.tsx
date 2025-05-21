"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { IPurchaseOrder } from "@/type/types";
import PurchaseOrderStatus from "@/components/frontend/orders/PurchaseOrderStatus";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";

export const columns: ColumnDef<IPurchaseOrder>[] = [
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
    accessorKey: "refNo",
    header: ({ column }) => (
      <SortableColumn column={column} title="Reference" />
    ),
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      const purchase = row.original;
      const supplier = purchase?.supplier?.name;
      return (
        <div>
          <p>{supplier}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <SortableColumn column={column} title="Grand Total" />
    ),
    cell: ({ row }) => {
      const purchase = row.original;
      const totalAmount = purchase?.totalAmount;
      return (
        <div className="ml-8">
          <p>{totalAmount.toLocaleString("EN-us")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "paid",
    header: "Paid",
    cell: ({ row }) => {
      const purchase = row.original;
      const paid = purchase?.totalAmount - purchase.balanceAmount;
      return (
        <div className="">
          <p>{paid.toLocaleString("EN-us")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "balanceAmount",
    header: ({ column }) => (
      <SortableColumn column={column} title="Due" />
    ),
    cell: ({ row }) => {
      const purchase = row.original;
      const balance = purchase?.balanceAmount;
      return (
        <div className="ml-4">
          <p>{balance.toLocaleString("EN-us")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Order status",
    cell: ({ row }) => {
      const item = row.original;
      return <PurchaseOrderStatus order={item} />;
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
      const purchase = row.original;
      return (
        <ActionColumn
          row={row}
          model="purchaseOrder"
          revPath="/dashboard/stock/purchase"
          editEndpoint={`purchase/update/${purchase.id}`}
          id={purchase.id}
        />
      );
    },
  },
];
