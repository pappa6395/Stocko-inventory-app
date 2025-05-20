import { getAllProducts } from "@/actions/products";
import { getPurchaseOrderById } from "@/actions/purchases";
import { getAllSuppliers } from "@/actions/suppliers";
import PurchaseForm from "@/components/dashboard/Forms/PurchaseForm";
import React from "react";

type Props = {
    params: Promise<{ id: string }>
}

export default async function page({params}: Props ) {

    const { id } = await params;
    const purchaseId = Number(id);

    const products = (await getAllProducts()) || [];
    const suppliers = (await getAllSuppliers()) || [];
    const purchase = await getPurchaseOrderById(purchaseId);

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
