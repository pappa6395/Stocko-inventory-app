import React from "react";
import { getAllProducts } from "@/actions/products";
import TableHeader from "@/components/dashboard/Table/dataTableComponents/TableHeader";
import DataTable from "@/components/dashboard/Table/dataTableComponents/DataTable";
import { columns } from "./columns";


export default async function page() {
  const products = (await getAllProducts()) || [];
  return (
    <div>
      <TableHeader
        title="Inventory Report"
        linkTitle="Add Product"
        href="/dashboard/inventory/products/new"
        data={products}
        model="product"
      />
      {/* <CustomDataTable categories={categories} /> */}
      <DataTable columns={columns} data={products} />
    </div>
  );
}
