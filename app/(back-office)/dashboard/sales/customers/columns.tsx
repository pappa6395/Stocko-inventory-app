"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
 
import DateColumn from "@/components/dashboard/Table/dataTableColumns/DateColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/dashboard/Table/dataTableColumns/ActionColumns";
import { Customer } from "@/type/types";
import Image from "next/image";


export const columns: ColumnDef<Customer>[] = [
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
      const customer = row.original
      const imageUrl = customer?.profileImage || "/placeholder.svg"
      return (
        <div className="flex-shrink-0">
            <Image 
              src={imageUrl || "/placeholder.svg"} 
              alt={customer?.firstName || ""} 
              width={50} 
              height={50}
              className="object-contain w-10 h-12" 
            />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const customer = row.original
      const fullName = `${customer?.firstName} ${customer?.lastName}` || ""
      return <p>{fullName}</p>
    }
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ row }) => {
      const customer = row.original
      const email = customer?.email || ""
      return <p>{email}</p>
    }
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => {
      const customer = row.original
      const phone = customer?.phone || ""
      return <p>{phone}</p>
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
      const customer = row.original;
      return (
        <ActionColumn
          row={row}
          model="customer"
          revPath="/dashboard/sales/customers"
          editEndpoint={`customers/update/${customer.id}`}
          id={(customer.id)}
        />
      );
    },
  },
];