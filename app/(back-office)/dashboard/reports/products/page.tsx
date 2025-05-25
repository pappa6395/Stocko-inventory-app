import DataTable from "@/components/dashboard/Table/dataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Table/dataTableComponents/TableHeader";
import React from "react";
import { columns } from "./columns";
import { getProductsWithSales } from "@/actions/products";


export default async function page() {
  const products = (await getProductsWithSales()) || [];
  return (
    <div>
      <TableHeader
        title="Products Report"
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
