
import React from "react";
import TableHeader from "@/components/dashboard/Table/dataTableComponents/TableHeader";
import DataTable from "@/components/dashboard/Table/dataTableComponents/DataTable";
import { columns } from "./columns";
import { getAdjustments } from "@/actions/adjustments";

export default async function page() {
  const adjustments = (await getAdjustments()) || [];
  return (
    <div>
      <TableHeader
        title="Adjustments"
        model="adjustment"
        linkTitle="Add Adjustment"
        href="/dashboard/stock/adjustment/new"
        data={adjustments}
      />
      {/* <CustomDataTable categories={categories} /> */}
      <DataTable columns={columns} data={adjustments} />
    </div>
  );
}
