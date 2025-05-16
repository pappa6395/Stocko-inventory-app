import * as React from "react";
import AuthorizePageWrapper from "@/components/dashboard/auth/AuthPageWrapper";
import { permissionsObj } from "@/config/permissions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import ChangePasswordForm from "@/components/frontend/ChangePasswordForm";
import UpdateProfile from "@/components/dashboard/settings/UpdateProfile";
import UpdatePassword from "@/components/dashboard/settings/UpdatePassword";
import { getRoleById } from "@/actions/roles";
import UpdatePasswordForm from "@/components/dashboard/settings/UpdatePassword";
import { redirect } from "next/navigation";


export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const userId = session?.user.id
  const role = (await getRoleById(userId))?.data
  const roleId = role?.id.toString() || "";
  
  return (
    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewSettings}>
      <div>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Update Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <UpdateProfile session={session} />
          </TabsContent>
          <TabsContent value="password">
            <UpdatePasswordForm session={session} roleId={roleId} />
          </TabsContent>
        </Tabs>
      </div>
    </AuthorizePageWrapper>
  );
}
