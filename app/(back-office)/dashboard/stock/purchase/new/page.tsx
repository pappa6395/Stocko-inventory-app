import { getAllProducts } from "@/actions/products";
import { getAllSuppliers } from "@/actions/suppliers";
import PurchaseForm from "@/components/dashboard/Forms/PurchaseForm";
import { IProducts } from "@/type/types";
import { Supplier } from "@prisma/client";
import React from "react";

export default async function page() {

  let products = [] as IProducts[];
  let suppliers = [] as Supplier[];

  try {
    const [productResponse, supplierResponse] = await Promise.all([
      getAllProducts(), 
      getAllSuppliers()
    ])
    products = productResponse || [];
    suppliers = supplierResponse || [];

  } catch (err) {
    console.error("Failed to fetch products or suppliers:", err);
    return null;
  }

  return (
    <div>
      <PurchaseForm products={products} suppliers={suppliers} />
    </div>
  );
}
