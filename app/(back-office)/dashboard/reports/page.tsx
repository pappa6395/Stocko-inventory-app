import * as React from "react";
import AuthorizePageWrapper from "@/components/dashboard/auth/AuthPageWrapper";
import { permissionsObj } from "@/config/permissions";
import Reports from "@/components/dashboard/reports/Reports";

export default function page() {
  return (
    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewReports}>
      <div>
        <Reports />
      </div>
    </AuthorizePageWrapper>
  );
}
