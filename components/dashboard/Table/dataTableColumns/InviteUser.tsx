import React, { useState } from "react";

import { IUser } from "@/type/types";
import { inviteUser } from "@/actions/users";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InviteUserEmailProps } from "@/emails";

export default function InviteUser({ user }: { user: IUser }) {
  const [loading, setLoading] = useState(false);
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;
  async function sendInvite() {
    setLoading(true);
    try {
      const data: InviteUserEmailProps = {
        username: user.firstName,
        password: user.password ?? "",
        invitedByUsername: "Admin Stocko-Online",
        invitedByEmail: "admin@beauty-property.com",
        loginEmail: user.email,
        inviteRole: user.role.displayTitle,
        inviteLink: baseUrl,
      };
      await inviteUser(data);
      toast.success("Invite Sent successfully");
      setLoading(false);
      // window.reload()
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div className="">
      {loading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending please wait...
        </Button>
      ) : (
        <Button
          // disabled={user.inviteSent}
          onClick={sendInvite}
          size={"sm"}
          variant={user.inviteSent ? "destructive" : "outline"}
        >
          {user.inviteSent ? "Invite Again" : "Invite User"}
        </Button>
      )}
    </div>
  );
}
