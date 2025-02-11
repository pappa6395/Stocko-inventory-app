
import { getAllBrands } from '@/actions/brand';
import { getAllSubCategories } from '@/actions/subCategories';
import { getAllSuppliers } from '@/actions/suppliers';
import { getAllUnits } from '@/actions/units';
import ProductForm from '@/components/dashboard/Forms/ProductForm';
import React from 'react';

const page = async () => {

  const subCategories = await getAllSubCategories() || [];
  const brands = await getAllBrands() || [];
  const suppliers = await getAllSuppliers() || []
  const units = await getAllUnits() || []

  return (

    <div className="flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
        <ProductForm
          productSubCategories={subCategories ?? []}
          productBrands={brands ?? []}
          productSuppliers={suppliers ?? []}
          productUnits={units?? []}
        />
    </div>

  )
}

export default page