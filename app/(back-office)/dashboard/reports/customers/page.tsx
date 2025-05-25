
import { getCustomers, getCustomersWithOrders } from "@/actions/orders";
import AuthorizePageWrapper from "@/components/dashboard/auth/AuthPageWrapper";
import DataTable from "@/components/dashboard/Table/dataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Table/dataTableComponents/TableHeader";
import { permissionsObj } from "@/config/permissions";
import { columns } from "./columns";

export default async function page() {
  const customers = (await getCustomersWithOrders()) || [];
  return (
    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewCustomers}>
      <div>
        <TableHeader
          title="Customers Report"
          linkTitle="Add Customer"
          href="/dashboard/sales/customers/new"
          data={customers}
          model="customer"
        />
        {/* <CustomDataTable categories={categories} /> */}
        <DataTable columns={columns} data={customers} />
      </div>
    </AuthorizePageWrapper>
  );
}
