import { getAllMainCategories } from "@/actions/main-categories";
import CategoryForm from "@/components/dashboard/Forms/CategoryForm";

export default async function page() {
  const allMainCategories = (await getAllMainCategories()) || [];
  
  return <CategoryForm mainCategories={allMainCategories} />;
}
