import { getAllProducts } from "@/actions/products";
import { getPurchaseOrderById } from "@/actions/purchases";
import { getAllSuppliers } from "@/actions/suppliers";
import PurchaseForm from "@/components/dashboard/Forms/PurchaseForm";
import { IProducts, IPurchaseOrder } from "@/type/types";
import { Supplier } from "@prisma/client";
import React from "react";

type Props = {
    params: Promise<{ id: string }>
}

export default async function page({params}: Props ) {

    const { id } = await params;
    const purchaseId = Number(id);

    let products = [] as IProducts[];
    let suppliers = [] as Supplier[];
    let purchase = null;

    try {
      const [
        productResponse, 
        supplierResponse, 
        purchaseResponse
      ] = await Promise.all([
        getAllProducts(), 
        getAllSuppliers(), 
        getPurchaseOrderById(purchaseId)
      ])
      products = productResponse || [];
      suppliers = supplierResponse || [];
      purchase = purchaseResponse as IPurchaseOrder;

    } catch (err) {
      console.error("Failed to fetch purchase order:", err);
      return null;
    }

  return (
    <div>
      <PurchaseForm
        products={products}
        suppliers={suppliers}
        initialData={purchase}
        editingId={id}
      />
    </div>
  );
}
