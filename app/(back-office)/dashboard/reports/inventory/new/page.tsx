import { getAllBrands } from "@/actions/brand";
import { getAllSubCategories } from "@/actions/subCategories";
import { getAllSuppliers } from "@/actions/suppliers";
import { getAllUnits } from "@/actions/units";
import ProductForm from "@/components/dashboard/Forms/ProductForm";



export default async function page() {
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
    />
  );
}
