
import DataTable from "@/components/dashboard/Table/dataTableComponents/DataTable";
import TableHeader from '@/components/dashboard/Table/dataTableComponents/TableHeader'
import React from "react";
import { columns } from "./columns";
import { getOrders } from "@/actions/pos";

export default async function page() {
  const orders = (await getOrders()).data || [];
  return (
    <div>
      <TableHeader
        title="Orders"
        linkTitle="Add Order"
        href="/dashboard/orders/new"
        data={orders}
        model="order"
      />
      {/* <CustomDataTable categories={categories} /> */}
      <DataTable data={orders} columns={columns}/>
    </div>
  );
}
