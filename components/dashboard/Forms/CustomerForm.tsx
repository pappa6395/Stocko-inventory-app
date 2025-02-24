"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import Select from "react-tailwindcss-select";
import { useForm } from 'react-hook-form';
import { ICustomer } from '@/type/types'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Role } from '@prisma/client'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'
import { Lock } from 'lucide-react'
import PasswordInput from '@/components/global/FormInputs/PasswordInput'
import TextArea from '@/components/global/FormInputs/TextAreaInput'
import { cn } from '@/lib/utils'
import CloseBtn from '@/components/global/FormInputs/CloseBtn'
import { createCustomer, CustomerDataProps, updateCustomerById } from '@/actions/customers'
import { deleteManylineOrder, deleteManylineOrderItem, deleteManySale } from '@/actions/pos'


type CustomerFormProps = {
  initialData?: ICustomer | null;
  editingId?: string;
  roles: Role[];
}

const CustomerForm = ({
  initialData,
  editingId,
  roles,
}: CustomerFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerDataProps>({
    defaultValues: {
      firstName: initialData?.user.firstName || "",
      lastName: initialData?.user.lastName || "",
      password: initialData?.user.password || "",
      confirmPassword: initialData?.user.password || "",
      email: initialData?.user.email || "",
      phone: initialData?.user.phone || "",
      shippingAddress: initialData?.shippingAddress || "",
      billingAddress: initialData?.billingAddress || "",
      additionalInfo: initialData?.additionalInfo || "",

    }
    
  });


  const router = useRouter()
  const initialStatus = {
    value: initialData?.user?.status ? true : false,
    label: initialData?.user?.status ? "Active" : "Disabled"
  }
  const [status, setStatus] = useState<any>(initialStatus || "");
  const [file, setFile] = useState<File | null>(null);
  const initialProfileImage = initialData?.user.profileImage || null
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
  const initialRoleId = initialData?.user?.roleId || 0;
  const initialRole = roleOptions?.find((role) => Number(role.value) === initialRoleId);
  const [selectedRole, setSelectedRole] = useState<any>(initialRole)

  // Step
  const [step, setStep] = useState(1)
  const nextStep= () => {
      if (step < 3) {
          setStep((prev) => prev + 1)
      }
  }
  const prevStep = () => {
      if (step > 1) {
          setStep((prev) => prev - 1)
      }
  }

  const saveCustomer = async(data: CustomerDataProps) => {
    
    // if (!initialData?.user?.id) {
    //   throw new Error("User ID is required");
    // }
    const userId = Number(editingId) 
    const customerId = initialData?.userId || 0;
    data.profileImage = fileUrl || "/placeholder.svg";
    data.status = status?.value as boolean;
    data.roleId = Number(selectedRole.value || "");
    console.log("User Data:", data);
    setIsLoading(true);
    try {

      if (customerId) {
        const updateCustomer = await updateCustomerById(userId, customerId, data)
        console.log("Updated customer:", updateCustomer);
        
        if (updateCustomer) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/sales/customers`);
        }
      } else {
        const newCustomer = await createCustomer(data);
        
        if (newCustomer) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/sales/customers`);
        }
      }
      
    } catch (error) {
      console.error("Failed to save or update customer:", error);
      setIsLoading(false);
    }
  }

  // const handleBack = () => {
  //   router.back()
  // };

  const deleteAll = async () => {
    try {
      await deleteManySale();
      await deleteManylineOrderItem();
      await deleteManylineOrder()

    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  }

  return (

    <div>
      <FormHeader 
        title={"Customer"} 
        editingId={editingId}
        href={"/sales/customers"} 
        loading={isLoading} 
      />
      {/* <Button type="button" onClick={deleteAll}>Delete</Button> */}
      <div className={cn(step === 1 ? 'grid grid-cols-1 sm:grid-cols-12 py-4 w-full' : "")}>
        {step === 2 ? "" : (
            <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
            <ImageInput 
              title="Customer Image"
              description="Update the Customer image"
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
              file={file}
              setFile={setFile}
            /> 
          </div>  
        )}
        {step === 1 && (
          <div className='hidden md:grid sm:col-span-4 col-span-full'>
            <ImageInput 
              title="Profile Image"
              description="Update your profile image"
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
              file={file}
              setFile={setFile}
            /> 
          </div>  
        )}
        <form 
          onSubmit={handleSubmit(saveCustomer)} 
          className={cn(step === 1 ? 'grid md:col-span-8 col-span-full gap-4' : 'grid grid-cols-1 md:grid-cols-12 py-4 w-full' )}>
          {step === 1 && (
            <div className='space-y-4 px-4'>
              <Card>
                  <CardHeader>
                      <CardTitle>Customer Contact Info</CardTitle>
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
                          <div className="grid md:grid-cols-2 gap-3">
                            <TextArea
                              register={register}
                              errors={errors}
                              label="Additional Info"
                              name="additionalInfo"
                            />
                          </div>
                      </div>
                  </CardContent>
              </Card>
              <div className='grid py-6 translate-y-10'>
                <div className='flex gap-4 justify-end'>
                  <CloseBtn 
                    href='/customers'
                    parent='sales'
                    size={"lg"}
                  />
                  <Button
                    type='button'
                    onClick={nextStep} 
                    variant={"default"} 
                    size="lg"
                    className=''
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className='grid md:col-span-6 gap-4 col-span-full'>
              <Card>
                  <CardHeader>
                      <CardTitle className=''>Customer Authentication</CardTitle>
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
            </div>
          )}
          {step === 2 && (
            <div className='grid pt-4 md:pt-0 px-0 md:px-4 col-span-full md:col-span-6 gap-4 h-fit'>
              <Card>
                <CardHeader>
                    <CardTitle>Customer Address</CardTitle>
                    <CardDescription>Update your address here</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <TextArea
                              register={register}
                              errors={errors}
                              label="Billing Address"
                              name="billingAddress"
                            />
                            <TextArea
                              register={register}
                              errors={errors}
                              label="Shipping Address"
                              name="shippingAddress"
                            />
                        </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          )}
          {step === 2 && (
            <div className='grid py-6 col-span-full translate-y-10'>
              <div className='flex justify-between gap-4'>
                <Button
                  type='button'
                  onClick={prevStep} 
                  variant={"outline"} 
                  size="lg"
                >
                  Previous
                </Button>
                <SubmitButton
                  size={"sm"}
                  title={editingId ? "Update Customer" : "Save Customer"}
                  loading={isLoading}
                  loadingTitle={isLoading ? "Saving..." : "Save Customer"}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
    
  )
}

export default CustomerForm