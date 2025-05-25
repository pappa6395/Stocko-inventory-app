import React from "react";
import { getAllRoles } from "@/actions/roles";
import CustomerForm from "@/components/dashboard/Forms/CustomerForm";
import { getCustomerById } from "@/actions/customers";

type Props = {
  params: Promise<{ id: string }>
}

export default async function page({ params }: Props) {

  const { id } = await params;

  const customer = (await getCustomerById(id))?.data || null;
  const roles = (await getAllRoles())?.data || [];
  return <CustomerForm roles={roles} editingId={id} initialData={customer} />;
}
