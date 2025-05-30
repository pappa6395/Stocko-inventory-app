"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CustomerWithOrderDetails } from "@/actions/orders";
import { formatMoney } from "@/lib/formatMoney";
import SortableColumn from "@/components/dashboard/Table/dataTableColumns/SortableColumn";
export const columns: ColumnDef<CustomerWithOrderDetails>[] = [
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
    accessorKey: "profileImage",
    header: "Profile Image",
    cell: ({ row }) => {
      const customer = row.original;
      const imageUrl = customer.profileImage;
      return (
        <div className="shrink-0">
          <Image
            alt={customer.firstName}
            className="aspect-square rounded-md object-cover"
            height="50"
            src={imageUrl ?? ""}
            width="50"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <SortableColumn column={column} title="Phone Number" />
    ),
  },

  {
    accessorKey: "totalOrders",
    header: "Total Orders ",
    cell: ({ row }) => {
      const customer = row.original;
      const orders = customer.totalOrders;
      return <h2>{orders}</h2>;
    },
  },
  {
    accessorKey: "totalRevenue",
    header: "Total Revenue ",
    cell: ({ row }) => {
      const customer = row.original;
      const revenue = customer.totalRevenue;
      return <h2>{formatMoney(revenue)}</h2>;
    },
  },
];
