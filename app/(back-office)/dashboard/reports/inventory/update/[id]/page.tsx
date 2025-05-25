import { getAllBrands } from "@/actions/brand";
import { getProductById } from "@/actions/products";
import { getAllSubCategories } from "@/actions/subCategories";
import { getAllSuppliers } from "@/actions/suppliers";
import { getAllUnits } from "@/actions/units";
import ProductForm from "@/components/dashboard/Forms/ProductForm";

type Props = {
  params: Promise<{ id: string }>
}

export default async function page({ params }: Props) {

  const { id } = await params;

  const product = await getProductById(id);
  const allSubCategories = (await getAllSubCategories()) || [];
  const allBrands = (await getAllBrands()) || [];
  const allSuppliers = (await getAllSuppliers()) || [];
  const allUnits = (await getAllUnits()) || [];
  
  return (
    <ProductForm
      productSubCategories={allSubCategories}
      productBrands={allBrands}
      productSuppliers={allSuppliers}
      productUnits={allUnits}
      editingId={id}
      initialData={product}
    />
  );
}
