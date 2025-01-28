"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import Select from "react-tailwindcss-select";
import { useForm } from 'react-hook-form';
import { SupplierProps } from '@/type/types'
import { generateSlug } from '@/lib/generateSlug'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Supplier } from '@prisma/client'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { createSupplier, updateSupplierById } from '@/actions/suppliers'


type SupplierFormProps = {
  initialData?: Supplier | null;
  editingId?: string;
}

const SupplierForm = ({
  initialData,
  editingId,
}: SupplierFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierProps>({
    defaultValues: {
      name: initialData?.name || "",
      companyName: initialData?.companyName || "",
      vatNumber: initialData?.vatNumber || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      postalCode: initialData?.postalCode || "",
      country: initialData?.country || "",
    }
    
  });

  const router = useRouter()
  const initialStatus = {
    value: initialData?.status ? true : false,
    label: initialData?.status ? "Active" : "Disabled"
  }
  const [status, setStatus] = useState<any>(initialStatus);
  const [file, setFile] = useState<File | null>(null);
  const initialImageUrl = initialData?.imageUrl || null
  const [fileUrl, setFileUrl] = useState<string | null>(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const options: any[] = [
    { value: true, label: "Active" },
    { value: false, label: "Disabled" },
  ];

  const saveSupplier = async(data: SupplierProps) => {
    
    try {
      setIsLoading(true);
      
      data.imageUrl = fileUrl;
      data.status = status?.value as boolean;
      data.slug = generateSlug(data.name);
      if (editingId) {
        const updateSupplier = await updateSupplierById(editingId, data)
        console.log("Updated supplier:", updateSupplier);
        
        if (updateSupplier) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/suppliers`);
        }
      } else {
        const newSupplier = await createSupplier(data);
        
        if (newSupplier) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/suppliers`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update supplier:", error);
    }
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader title={"Supplier"} onClick={handleBack} editingId={editingId} />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
          <ImageInput 
            title="Supplier Image"
            description="Update the Supplier image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
            isLoading={isLoading}
          /> 
        </div>  
        <form 
          onSubmit={handleSubmit(saveSupplier)} 
          className='grid md:col-span-8 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Supplier Status</CardTitle>
                    <CardDescription>Update the supplier status</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        <Label htmlFor="warehouse">Status</Label>
                        <Select
                          value={status}
                          onChange={(value: any) => setStatus(value)}
                          options={options} 
                          primaryColor={'primary'}
                        />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Supplier</CardTitle>
                    <CardDescription>Update the supplier details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                          <TextInput
                              register={register}
                              errors={errors}
                              label="Supplier Name"
                              name="name"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                        <TextInput
                              register={register}
                              errors={errors}
                              label="Company Name"
                              name="companyName"
                            />
                             <TextInput
                              register={register}
                              errors={errors}
                              label="VAT Number"
                              name="vatNumber"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <TextInput
                              register={register}
                              errors={errors}
                              label="Email"
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
                        <div className="grid gap-3">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Address"
                              name="address"
                            /> 
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <TextInput
                              register={register}
                              errors={errors}
                              label="City"
                              name="city"
                            />
                          <TextInput
                              register={register}
                              errors={errors}
                              label="State"
                              name="state"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <TextInput
                              register={register}
                              errors={errors}
                              label="Postal Code"
                              name="postalCode"
                            />
                          <TextInput
                              register={register}
                              errors={errors}
                              label="Country"
                              name="country"
                            />
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
                  Discard
                </Button>
                <SubmitButton
                  size={"sm"}
                  title={editingId ? "Update Supplier" : "Save Supplier"}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
        <div className='hidden md:grid sm:col-span-4 col-span-full space-y-6'>
          <ImageInput 
            title="Supplier Image"
            description="Update the supplier image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
            isLoading={isLoading}
          /> 
        </div>  
      </div>
    </div>
    
  )
}

export default SupplierForm