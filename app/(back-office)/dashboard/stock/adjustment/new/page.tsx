import { getAllProducts } from '@/actions/products';
import AdjustmentForm from '@/components/dashboard/Forms/AdjustmentForm';
import React from 'react'

const NewStockAdjustmentPage = async() => {

  const products = await getAllProducts() || [];

  return (
    <div>
      <AdjustmentForm products={products} />
    </div>
  );
}

export default NewStockAdjustmentPage