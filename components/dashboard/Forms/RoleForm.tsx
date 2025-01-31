"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { RoleProps } from '@/type/types'
import toast from 'react-hot-toast'
import { Role } from '@prisma/client'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import FormFooter from '@/components/global/FormInputs/FormFooter'
import { permissions } from '@/config/permissions'
import { createRoleName } from '@/lib/createRoleName'
import { createRole, updateRoleById } from '@/actions/roles'


type RoleFormProps = {
  initialData?: Role | null;
  editingId?: string;
}

const RoleForm = ({
  initialData,
  editingId,
}: RoleFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleProps>({
    defaultValues: {
      displayTitle: initialData?.displayTitle || "",
      roleTitle: initialData?.roleTitle || "",
      description: initialData?.description || "",
      canViewBrands: initialData?.canViewBrands || false,
      canAddBrands: initialData?.canAddBrands || false,
      canEditBrands: initialData?.canEditBrands || false,
      canDeleteBrands: initialData?.canDeleteBrands || false,
      canViewCategories: initialData?.canViewCategories || false,
      canAddCategories: initialData?.canAddCategories || false,
      canEditCategories: initialData?.canEditCategories || false,
      canDeleteCategories: initialData?.canDeleteCategories || false,
      canViewProducts: initialData?.canViewProducts || false,
      canAddProducts: initialData?.canAddProducts || false,
      canEditProducts: initialData?.canEditProducts || false,
      canDeleteProducts: initialData?.canDeleteProducts || false,
      canAccessDashboard: initialData?.canAccessDashboard || false,
      canManageRoles: initialData?.canManageRoles || false,
      canManageUnits: initialData?.canManageUnits || false,
      canViewUsers: initialData?.canViewUsers || false,
      canAddUsers: initialData?.canAddUsers || false,
      canEditUsers: initialData?.canEditUsers || false,
      canDeleteUsers: initialData?.canDeleteUsers || false,
      canViewWarehouses: initialData?.canViewWarehouses || false,
      canAddWarehouses: initialData?.canAddWarehouses || false,
      canEditWarehouses: initialData?.canEditWarehouses || false,
      canDeleteWarehouses: initialData?.canDeleteWarehouses || false,
      canViewSuppliers: initialData?.canViewSuppliers || false,
      canAddSuppliers: initialData?.canAddSuppliers || false,
      canEditSuppliers: initialData?.canEditSuppliers || false,
      canDeleteSuppliers: initialData?.canDeleteSuppliers || false,
    }
    
  });

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const saveRole = async(data: RoleProps) => {
    
    data.roleTitle = createRoleName(data?.displayTitle || "")
    console.log("Data:", data);
    
    
    try {
      setIsLoading(true);
      
      if (editingId) {
        const updateRole = await updateRoleById(editingId, data)
        console.log("Updated role:", updateRole);
        
        if (updateRole) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/users/roles`);
        }
      } else {
        const newRole = await createRole(data);
        
        if (newRole) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/users/roles`);
        } else {
          toast.error("Failed to create role");
          reset();
          setIsLoading(false);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update unit:", error);
    }
  }

  return (

    <div>
      <FormHeader 
        title={"Role"} 
        editingId={editingId}
        parent={"/users"}
        href={"/roles"} 
        loading={isLoading} 
      />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <form 
          onSubmit={handleSubmit(saveRole)} 
          className='grid col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Roles</CardTitle>
                    <CardDescription>Update the role details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-3">
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
                </CardContent>
            </Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Module</TableHead>
                  <TableHead>Privileges</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{permission.model}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <ul className="items-center w-full text-sm font-medium 
                        text-gray-900 bg-white border border-gray-200 rounded-lg 
                        sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          {permission.permissions.map((item, j) => {
                            return (
                              <li key={j} className="w-full border-b border-gray-200 sm:border-b-0 
                              sm:border-r dark:border-gray-600">
                                  <div className="flex items-center ps-3">
                                      <input 
                                        id={item.name} 
                                        type="checkbox"
                                        {...register(`${item.name}` as any)}
                                        name={item.name} 
                                        className="w-4 h-4 text-blue-600 bg-gray-100 
                                        border-gray-300 rounded-sm focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-700 
                                        dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 
                                        dark:border-gray-500"/>
                                      <label 
                                        htmlFor={item.name}
                                        className="w-full py-3 ms-2 text-sm font-medium 
                                        text-gray-900 dark:text-gray-300"
                                      >
                                        {item.display}
                                      </label>
                                  </div>
                              </li>
                            )
                          })}
                            
                        </ul>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className='grid py-6 translate-y-10'>
                <FormFooter 
                  title={"Role"} 
                  href={"/roles"} 
                  parent={"/users"}
                  editingId=''
                  loading={isLoading} 
                />
            </div>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default RoleForm