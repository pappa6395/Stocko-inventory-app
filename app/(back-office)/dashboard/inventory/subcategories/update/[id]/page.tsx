

import { getSubCategoryById } from '@/actions/subCategories';
import SubCategoryForm from '@/components/dashboard/Forms/SubCategoryForm';
import React from 'react'


const page = async ({params: id}: {params: string}) => {

    const subCategory = await getSubCategoryById(id) || null

    return (
  
      <div>
          <SubCategoryForm 
            initialData={subCategory ?? null}
            editingId={id ?? ""}
            />
      </div>
  
  
    )
}

export default page