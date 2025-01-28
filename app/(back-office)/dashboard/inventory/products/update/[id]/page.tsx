

import { PageProps } from '@/.next/types/app/(back-office)/dashboard/inventory/categories/new/page';
import { getAllBrands } from '@/actions/brand';
import { getAllCategories } from '@/actions/category';
import { getProductById } from '@/actions/products';
import { getAllSuppliers } from '@/actions/suppliers';
import { getAllUnits } from '@/actions/units';
import { getAllWarehouseProducts, getAllWarehouses } from '@/actions/warehouses';
import ProductForm from '@/components/dashboard/Forms/ProductForm';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise;

    const product = await getProductById(id) || null;
    const categories = await getAllCategories() || [];
    const brands = await getAllBrands() || [];
    const warehouses = await getAllWarehouses() || []
    const warehouseProducts = await getAllWarehouseProducts() || []
    const suppliers = await getAllSuppliers() || []
    const units = await getAllUnits() || []
  
    return (
  
      <div>
          <ProductForm 
            initialData={product ?? null}
            editingId={id ?? ""}
            productCategories={categories ?? []}
            productBrands={brands ?? []}
            productWarehouses={warehouseProducts ?? []}
            warehouses={warehouses ?? []}
            productSuppliers={suppliers ?? []}
            productUnits={units ?? []}
            />
      </div>
  
  
    )
}

export default page