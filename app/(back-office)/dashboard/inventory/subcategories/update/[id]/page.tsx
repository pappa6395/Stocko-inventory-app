

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/update/[id]/page';
import { getAllCategories } from '@/actions/category';
import { getSubCategoryById } from '@/actions/subCategories';
import SubCategoryForm from '@/components/dashboard/Forms/SubCategoryForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise
    const subCategory = await getSubCategoryById(id) || null
    const categories = await getAllCategories() || []

    return (
  
      <div>
          <SubCategoryForm 
            initialData={subCategory ?? null}
            editingId={id ?? ""}
            categories={categories}
            />
      </div>
  
  
    )
}

export default page