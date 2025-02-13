

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getAllBrands } from '@/actions/brand';
import { getProductById } from '@/actions/products';
import { getAllSubCategories } from '@/actions/subCategories';
import { getAllSuppliers } from '@/actions/suppliers';
import { getAllUnits } from '@/actions/units';
import ProductForm from '@/components/dashboard/Forms/ProductForm';
import React from 'react'

const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const product = await getProductById(id) || null;
    const subCategories = await getAllSubCategories() || [];
    const brands = await getAllBrands() || [];
    const suppliers = await getAllSuppliers() || []
    const units = await getAllUnits() || []
  
    return (
  
      <div>
          <ProductForm 
            initialData={product ?? null}
            editingId={id ?? ""}
            productSubCategories={subCategories ?? []}
            productBrands={brands ?? []}
            productSuppliers={suppliers ?? []}
            productUnits={units ?? []}
            />
      </div>
  
  
    )
}

export default page