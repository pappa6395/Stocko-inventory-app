"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import Select from "react-tailwindcss-select";
import { useForm } from 'react-hook-form';
import { WarehouseProps } from '@/type/types'
import { generateSlug } from '@/lib/generateSlug'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Warehouse } from '@prisma/client'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { createWarehouse, updateWarehouseById } from '@/actions/warehouses'


type WarehouseFormProps = {
  initialData?: Warehouse | null;
  editingId?: string;
}

const WarehouseForm = ({
  initialData,
  editingId,
}: WarehouseFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WarehouseProps>({
    defaultValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      country: initialData?.country || "",
      city: initialData?.city || "",
      zipCode: initialData?.zipCode || "",
      contactPerson: initialData?.contactPerson || "",
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

  const saveCategory = async(data: WarehouseProps) => {
    
    try {
      setIsLoading(true);
      
      data.imageUrl = fileUrl;
      data.status = status?.value as boolean;
      data.slug = generateSlug(data.name);
      if (editingId) {
        const updateWarehouse = await updateWarehouseById(editingId, data)
        console.log("Updated warehouse:", updateWarehouse);
        
        if (updateWarehouse) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/warehouses`);
        }
      } else {
        const newWarehouse = await createWarehouse(data);
        
        if (newWarehouse) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/warehouses`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update warehouse:", error);
    }
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader title={"Warehouse"} editingId={editingId} href={"/warehouses"} loading={isLoading} />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
          <ImageInput 
            title="Warehouse Image"
            description="Update the Warehouse image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
            isLoading={isLoading}
          /> 
        </div>  
        <form 
          onSubmit={handleSubmit(saveCategory)} 
          className='grid md:col-span-8 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Warehouse Status</CardTitle>
                    <CardDescription>Update the warehouse status</CardDescription>
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
                    <CardTitle>Warehouse</CardTitle>
                    <CardDescription>Update the warehouse details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                          <TextInput
                              register={register}
                              errors={errors}
                              label="Warehouse Name"
                              name="name"
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
                        <div className="grid md:grid-cols-2 gap-3">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Country"
                              name="country"
                            />
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Contact Person"
                              name="contactPerson"
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
                              label="Zip Code"
                              name="zipCode"
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
                  Close
                </Button>
                <SubmitButton
                  size={"sm"}
                  title={editingId ? "Update Warehouse" : "Save Warehouse"}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
        <div className='hidden md:grid sm:col-span-4 col-span-full space-y-6'>
          <ImageInput 
            title="Warehouse Image"
            description="Update the warehouse image"
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

export default WarehouseForm