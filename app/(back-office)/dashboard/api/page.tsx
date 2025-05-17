import AuthorizePageWrapper from "@/components/dashboard/auth/AuthPageWrapper";
import { permissionsObj } from "@/config/permissions";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductEndpoints from "@/components/dashboard/endpoints/ProductEndpoints";
import UserEndpoints from "@/components/dashboard/endpoints/UserEndpoints";
import OrderEndpoints from "@/components/dashboard/endpoints/OrderEndpoints";

export default function page() {
  return (
    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewApi}>
      <div className="">
        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Products API Endpoints</TabsTrigger>
            <TabsTrigger value="users">Users API Endpoints</TabsTrigger>
            <TabsTrigger value="orders">Orders API Endpoints</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductEndpoints />
          </TabsContent>
          <TabsContent value="users">
            <UserEndpoints />
          </TabsContent>
          <TabsContent value="orders">
            <OrderEndpoints />
          </TabsContent>
        </Tabs>
      </div>
    </AuthorizePageWrapper>
  );
}
