import { getAllRoles } from "@/actions/roles";
import CustomerForm from "@/components/dashboard/Forms/CustomerForm";

export default async function page() {
  const roles = (await getAllRoles())?.data || [];
  return <CustomerForm roles={roles} />;
}
