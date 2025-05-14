import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AuthorizePageWrapper from "@/components/dashboard/auth/AuthPageWrapper";
import { permissionsObj } from "@/config/permissions";
export default function page() {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewSettings}>
      <div>
        <div className="grid grid-cols-12">
          <div className="col-span-3 border-r">
            <ScrollArea className="h-[400px] w-full rounded-md ">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                  <>
                    <div key={tag} className="text-sm">
                      {tag}
                    </div>
                    <Separator className="my-2" />
                  </>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="col-span-9">
            <div className="h2">Settings</div>
          </div>
        </div>
      </div>
    </AuthorizePageWrapper>
  );
}
