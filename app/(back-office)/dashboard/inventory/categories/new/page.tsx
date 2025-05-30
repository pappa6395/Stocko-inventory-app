import { getAllMainCategories } from '@/actions/main-categories';
import CategoryForm from '@/components/dashboard/Forms/CategoryForm'
import React from 'react'

const page = async () => {

  const mainCategories = await getAllMainCategories() || [];

  return (

    <div className="flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
        <CategoryForm mainCategories={mainCategories} />
    </div>

  )
}

export default page