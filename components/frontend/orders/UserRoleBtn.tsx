"use client";
import { LineOrder } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormSelectInput from "@/components/global/FormInputs/FormSelectInput";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/global/FormInputs/SubmitButton";
import { Pencil } from "lucide-react";
import { changeOrderStatusById, StatusData } from "@/actions/orders";
import toast from "react-hot-toast";
import { IUser } from "@/type/types";
import { getAllRoles } from "@/actions/roles";
import { Options } from "react-tailwindcss-select/dist/components/type";
import { updateUserRole } from "@/actions/users";
export default function UserRoleBtn({ user }: { user: IUser }) {
    
  const [roles, setRoles] = useState<Options | undefined>(undefined);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const data = (await getAllRoles()).data || [];
        const dataOptions = data?.map((item) => {
          return {
            label: item.displayTitle || "",
            value: item.id.toString() || "",
          };
        });
        setRoles(dataOptions);
      } catch (error) {}
    }
    fetchRoles();
  }, []);

  const initialUserRole = {
    label: user.role.displayTitle,
    value: user.roleId,
  };
  const [selectedRole, setSelectedRole] = useState<any>(initialUserRole);
  const [loading, setLoading] = useState(false);
  
  async function handleChangeStatus(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    console.log(selectedRole);
    const userId = user.id.toString();

    try {
      const res = await updateUserRole(userId, selectedRole.value);
      if (res?.status === 200) {
        // setSelectedRole({
        //   label: res.data?.role,
        //   value: res.data?.status,
        // });
        setLoading(false);
        toast.success("Role Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong , Try again");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="">
          <button className="dark:text-slate-800 py-1.5 px-3 bg-green-200 rounded-full">
            {selectedRole.label}
          </button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Change User Role
          </DialogTitle>
          <DialogDescription className="text-white">
            Select Role
          </DialogDescription>
           <form className="space-y-4" onSubmit={handleChangeStatus}>
              <FormSelectInput
                label="Order Status"
                options={roles as Options}
                option={selectedRole}
                setOption={setSelectedRole}
              />
              <DialogFooter>
                <SubmitButton
                  title="Update Role"
                  loadingTitle="Updating please wait"
                  loading={loading}
                  buttonIcon={Pencil}
                />
              </DialogFooter>
            </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
