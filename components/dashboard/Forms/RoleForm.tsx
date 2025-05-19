"use client";

//import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FormHeader from "./FormHeader";
import { useRouter } from "next/navigation";
//import Select from "react-tailwindcss-select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BrandProps,
  CategoryProps,
  RoleProps,
  SelectOptionProps,
  UnitProps,
} from "@/type/types";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import TextInput from "@/components/global/FormInputs/TextInputForm";

import toast from "react-hot-toast";

import { Role, Unit } from "@prisma/client";
import { permissions } from "@/config/permissions";
import { createRoleName } from "@/lib/createRoleName";
import { createRole, updateRoleById } from "@/actions/roles";
import FormFooter from "@/components/global/FormInputs/FormFooter";


type RoleFormProps = {
  editingId?: string | undefined;
  initialData?: Role | undefined | null;
};

export default function RoleForm({ editingId, initialData }: RoleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Role>({
    defaultValues: {
      ...initialData,
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handleSelectAll = (moduleName: string) => {
  //   const modulePermissions = permissions.find(
  //     (perm) => perm.model === moduleName
  //   );
  //   if (modulePermissions) {
  //     modulePermissions.permissions.forEach((permission) => {
  //       setValue(permission.name as any, !watch(permission.name as any));
  //     });
  //   }
  // };

  async function saveRole(data: Role) {
    data.roleTitle = createRoleName(data.displayTitle);
    const { id, createdAt, updatedAt, ...others } = data;
    try {
      setLoading(true);
      data.roleTitle = createRoleName(data.displayTitle);
      if (editingId) {
        await updateRoleById(editingId, others as RoleProps);
        setLoading(false);
        toast.success("Updated Successfully!");
        reset();
        router.push("/dashboard/users/roles");
      } else {
        await createRole({data: others as RoleProps});
        setLoading(false);
        // console.log(others);
        toast.success("Successfully Created!");
        reset();
        router.push("/dashboard/users/roles");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    // <form className="" onSubmit={handleSubmit(saveRole)}>
    //   {/* Form content */}
    //   <FormHeader
    //     href="/roles"
    //     title="Role"
    //     parent="users"
    //     editingId={editingId}
    //     loading={loading}
    //   />
    //   <div className="max-w-4xl mx-auto space-y-6 py-8">
    //     <Card>
    //       <CardContent>
    //         <div className="grid  gap-6">
    //           <div className="grid gap-3 pt-4 grid-cols-1 md:grid-cols-2">
    //             <TextInput
    //               register={register}
    //               errors={errors}
    //               label="Role Title"
    //               name="displayTitle"
    //             />
    //             <TextInput
    //               register={register}
    //               errors={errors}
    //               label="Role Description"
    //               name="description"
    //             />
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardContent>
    //         <div className="">
    //           <Table>
    //             <TableHeader>
    //               <TableRow>
    //                 <TableHead className="w-[100px]">Module</TableHead>
    //                 <TableHead>Privileges</TableHead>
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //               {permissions.map((permission, index) => (
    //                 <TableRow key={index}>
    //                   <TableCell className="font-medium">
    //                     {permission.model}
    //                   </TableCell>
    //                   <TableCell>
    //                     <div className="flex items-center space-x-8">
    //                       <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    //                         {/* Select All Checkbox */}
    //                         <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
    //                           <div className="flex items-center ps-3">
    //                             <input
    //                               id={`selectAll-${permission.model}`}
    //                               type="checkbox"
    //                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
    //                               onChange={() =>
    //                                 handleSelectAll(permission.model)
    //                               }
    //                             />
    //                             <label
    //                               htmlFor={`selectAll-${permission.model}`}
    //                               className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    //                             >
    //                               Select All
    //                             </label>
    //                           </div>
    //                         </li>
    //                         {/* Individual Privileges */}
    //                         {permission.permissions.map((item, idx) => (
    //                           <li
    //                             key={idx}
    //                             className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
    //                           >
    //                             <div className="flex items-center ps-3">
    //                               <input
    //                                 id={item.name}
    //                                 type="checkbox"
    //                                 {...register(`${item.name}` as any)}
    //                                 name={item.name}
    //                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
    //                               />
    //                               <label
    //                                 htmlFor={item.name}
    //                                 className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    //                               >
    //                                 {item.display}
    //                               </label>
    //                             </div>
    //                           </li>
    //                         ))}
    //                       </ul>
    //                     </div>
    //                   </TableCell>
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>
    //   {/* Form footer */}
    //   <FormFooter
    //     href="/roles"
    //     editingId={editingId}
    //     loading={loading}
    //     title="Role"
    //     parent="users"
    //   />
    // </form>
    <form className="" onSubmit={handleSubmit(saveRole)}>
      {/* Form content */}
      <FormHeader
        href="/roles"
        title="Role"
        parent="users"
        editingId={editingId}
        loading={loading}
      />
      <div className="max-w-4xl mx-auto space-y-6 py-8">
        <Card>
          <CardContent>
            <div className="grid  gap-6">
              <div className="grid gap-3 pt-4 grid-cols-1 md:grid-cols-2">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Role Title"
                  name="displayTitle"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Role Description"
                  name="description"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="pt-4 font-medium">
              Select the Pages the User will have access
            </h2>
            <div className="grid grid-cols-4 gap-6 pt-6">
              {permissions.map((permission, index) => (
                <div className="flex items-center space-x-8" key={index}>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:flex">
                    <li
                      key={index}
                      className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                    >
                      <div className="flex items-center ps-3">
                        <input
                          id={permission.name}
                          type="checkbox"
                          {...register(`${permission.name}` as any)}
                          name={permission.name}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor={permission.name}
                          className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {permission.display}
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Form footer */}
      <FormFooter
        href="/roles"
        editingId={editingId}
        loading={loading}
        title="Role"
        parent="users"
      />
    </form>
  );
}
