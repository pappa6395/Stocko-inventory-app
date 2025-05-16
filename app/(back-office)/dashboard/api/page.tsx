import AuthorizePageWrapper from "@/components/dashboard/auth/AuthPageWrapper";
import { permissionsObj } from "@/config/permissions";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductEndpoints from "@/components/dashboard/endpoints/ProductEndpoints";

export default function page() {
  return (
    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewApi}>
      <div className="">
        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Products API Endpoints</TabsTrigger>
            <TabsTrigger value="password">...</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductEndpoints />
          </TabsContent>
          <TabsContent value="password">...</TabsContent>
        </Tabs>
      </div>
    </AuthorizePageWrapper>
  );
}
