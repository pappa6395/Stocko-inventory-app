
import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getCategoryById } from '@/actions/category';
import CategoryForm from '@/components/dashboard/Forms/CategoryForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const category = await getCategoryById(id) || null

  
    return (
  
      <div>
          <CategoryForm 
            initialData={category ?? null}
            editingId={id ?? ""}
            />
      </div>
  
  
    )
}

export default page