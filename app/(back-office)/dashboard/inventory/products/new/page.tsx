
import { getAllBrands } from '@/actions/brand';
import { getAllCategories } from '@/actions/category';
import { getAllSuppliers } from '@/actions/suppliers';
import { getAllUnits } from '@/actions/units';
import ProductForm from '@/components/dashboard/Forms/ProductForm';
import React from 'react';

const page = async () => {

  const categories = await getAllCategories() || [];
  const brands = await getAllBrands() || [];
  const suppliers = await getAllSuppliers() || []
  const units = await getAllUnits() || []

  return (

    <div className="flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
        <ProductForm
          productCategories={categories ?? []}
          productBrands={brands ?? []}
          productSuppliers={suppliers ?? []}
          productUnits={units?? []}
        />
    </div>

  )
}

export default page