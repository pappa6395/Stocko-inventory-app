import { getPurchaseOrders } from "@/actions/purchases";
import DataTable from "@/components/dashboard/Table/dataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Table/dataTableComponents/TableHeader";
import { columns } from "./columns";
import * as React from "react";


export default async function page() {
  const purchases = (await getPurchaseOrders()) || [];
  return (
    <div>
      <TableHeader
        title="Purchase Orders"
        model="purchaseOrder"
        linkTitle="Add Purchase Order"
        href="/dashboard/stock/purchase/new"
        data={purchases}
      />
      {/* <CustomDataTable categories={categories} /> */}
      <DataTable columns={columns} data={purchases} />
    </div>
  );
}
