import AuthorizePageWrapper from "@/components/dashboard/auth/AuthPageWrapper";
import { permissionsObj } from "@/config/permissions";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewSuppliers}>
      {children}
    </AuthorizePageWrapper>
  );
}
