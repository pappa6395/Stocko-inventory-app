
import React from "react";
import CategoryForm from "@/components/dashboard/Forms/CategoryForm";
import { getCategoryById } from "@/actions/category";
import { getAllMainCategories } from "@/actions/main-categories";
import { PageProps } from "@/.next/types/app/(back-office)/dashboard/orders/update/[id]/page";

export default async function page({params: paramsPromise}: PageProps) {

  const { id } = await paramsPromise

  const category = await getCategoryById(id);
  const allMainCategories = (await getAllMainCategories()) || [];
  
  return (
    <CategoryForm
      mainCategories={allMainCategories}
      editingId={id}
      initialData={category}
    />
  );
}
