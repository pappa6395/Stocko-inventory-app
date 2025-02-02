"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import Select from "react-tailwindcss-select";
import { useForm } from 'react-hook-form';
import { UserProps, WarehouseProps } from '@/type/types'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Role, User, Warehouse } from '@prisma/client'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'
import { Eye, EyeOff, Lock } from 'lucide-react'
import PasswordInput from '@/components/global/FormInputs/PasswordInput'
import { createUser, updateUserById } from '@/actions/users'


type UserFormProps = {
  initialData?: User | null;
  editingId?: string;
  roles: Role[];
}

const UserForm = ({
  initialData,
  editingId,
  roles,
}: UserFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProps>({
    defaultValues: {
      name: `${initialData?.firstName} ${initialData?.lastName}` || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      password: initialData?.password || "",
      phone: initialData?.phone || ""

    }
    
  });

  const router = useRouter()
  const initialStatus = {
    value: initialData?.status ? true : false,
    label: initialData?.status ? "Active" : "Disabled"
  }
  const [status, setStatus] = useState<any>(initialStatus || "");
  const [file, setFile] = useState<File | null>(null);
  const initialProfileImage = initialData?.profileImage || null
  const [fileUrl, setFileUrl] = useState<string | null>(initialProfileImage || null);
  const [isLoading, setIsLoading] = useState(false);
 

  const options: any[] = [
    { value: true, label: "Active" },
    { value: false, label: "Disabled" },
  ];

  // Role
  const roleOptions = roles?.map((role) => {
    return { 
      value: role.id.toString(), 
      label: role.displayTitle, 
    };
  })
  const initialRoleId = initialData?.roleId || 0;
  const initialRole = roleOptions?.find((role) => Number(role.value) === initialRoleId);
  const [selectedRole, setSelectedRole] = useState<any>(initialRole)


  const saveUser = async(data: UserProps) => {
    
    data.profileImage = fileUrl;
    data.status = status?.value as boolean;
    data.name = `${data.firstName} ${data.lastName}`
    data.roleId = Number(selectedRole.value || "");
    console.log("User Data:", data);
    setIsLoading(true);
    try {

      if (editingId) {
        const updateUser = await updateUserById(editingId, data)
        console.log("Updated warehouse:", updateUser);
        
        if (updateUser) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/users`);
        }
      } else {
        const newUser = await createUser(data);
        
        if (newUser) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/users`);
        }
      }
      
    } catch (error) {
      console.error("Failed to save or update user:", error);
      setIsLoading(false);
    }
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader 
        title={"User"} 
        editingId={editingId}
        href={"/users"} 
        loading={isLoading} 
      />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
          <ImageInput 
            title="Warehouse Image"
            description="Update the Warehouse image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
          /> 
        </div>  
        <form 
          onSubmit={handleSubmit(saveUser)} 
          className='grid md:col-span-8 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            <Card>
                <CardHeader>
                    <CardTitle>User Contact Info</CardTitle>
                    <CardDescription>Fill in your contact information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-3">
                          <TextInput
                            register={register}
                            errors={errors}
                            label="First Name"
                            name="firstName"
                            />
                          <TextInput
                            register={register}
                            errors={errors}
                            label="Last Name"
                            name="lastName"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <TextInput
                              register={register}
                              errors={errors}
                              label="Email Address"
                              name="email"
                              type="email"
                            />
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Phone Number"
                              name="phone"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className=''>User Authentication</CardTitle>
                    <CardDescription className=''>Update your authentication information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        {editingId ? "" : (
                          <div className="grid md:grid-cols-2 items-center gap-3">
                            <PasswordInput
                              register={register}
                              errors={errors}
                              label="Password"
                              name="password"
                              icon={Lock}
                              toolTipText='Password must be at least 8 charactors' 
                            />
                            <PasswordInput
                              register={register}
                              errors={errors}
                              label="Confirm Password"
                              name="confirmPassword"
                              type="password"
                              icon={Lock}
                              toolTipText='It must be the same as the password' 
                            />
                          </div>
                        )}
                        
                        <div className="grid md:grid-cols-2 gap-3">
                          <FormSelectInput 
                            label='Roles'
                            option={selectedRole}
                            options={roleOptions}
                            setOption={setSelectedRole}
                          />
                          <div className="grid gap-3 py-[0.3rem]">
                            <Label htmlFor="user">Status</Label>
                            <Select
                              value={status}
                              onChange={(value: any) => setStatus(value)}
                              options={options} 
                              primaryColor={'primary'}
                              placeholder='Select Status'
                            />
                        </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='grid py-6 translate-y-10'>
              <div className='flex justify-between gap-4'>
                <Button
                  type='button'
                  onClick={handleBack} 
                  variant={"outline"} 
                  size="lg"
                >
                  Close
                </Button>
                <SubmitButton
                  size={"sm"}
                  title={editingId ? "Update User" : "Save User"}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
        <div className='hidden md:grid sm:col-span-4 col-span-full space-y-6'>
          <ImageInput 
            title="Profile Image"
            description="Update your profile image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
          /> 
        </div>  
      </div>
    </div>
    
  )
}

export default UserForm