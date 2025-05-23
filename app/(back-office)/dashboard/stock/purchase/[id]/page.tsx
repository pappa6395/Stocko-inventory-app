import React from "react";

import { getPurchaseOrderById } from "@/actions/purchases";
import PurchaseDetails from "@/components/dashboard/PurchaseDetails";


type Props = {
    params: Promise<{ id: string}>
}

export default async function page({params}: Props) {

    const { id } = await params;
    const purchaseId = Number(id);

    const purchase = await getPurchaseOrderById(purchaseId);

    return <PurchaseDetails purchase={purchase} />;
}
