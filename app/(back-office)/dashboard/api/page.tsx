import AuthorizePageWrapper from "@/components/dashboard/auth/AuthPageWrapper";
import { permissionsObj } from "@/config/permissions";
import React from "react";

export default function page() {
  return (
    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewApi}>
      <div className="">
        <h2>API Integrations</h2>
      </div>
    </AuthorizePageWrapper>
  );
}
