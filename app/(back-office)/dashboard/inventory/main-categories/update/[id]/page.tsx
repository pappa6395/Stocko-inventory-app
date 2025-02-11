



import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/update/[id]/page';
import { getMainCategoryById } from '@/actions/main-categories';
import MainCategoryForm from '@/components/dashboard/Forms/MainCategoryForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise
    const mainCategory = await getMainCategoryById(id) || null

    return (

      <div>
          <MainCategoryForm 
            initialData={mainCategory ?? null}
            editingId={id ?? ""}
            />
      </div>
    )
}

export default page