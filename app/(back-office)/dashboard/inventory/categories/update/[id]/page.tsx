
import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getCategoryById } from '@/actions/category';
import { getAllMainCategories } from '@/actions/main-categories';
import CategoryForm from '@/components/dashboard/Forms/CategoryForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const category = await getCategoryById(id) || null
    const mainCategories = await getAllMainCategories() || [];

  
    return (
  
      <div>
          <CategoryForm 
            initialData={category ?? null}
            editingId={id ?? ""}
            mainCategories={mainCategories}
            />
      </div>
  
  
    )
}

export default page