"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import Select from "react-tailwindcss-select";
import { useForm } from 'react-hook-form';
import { BrandProps } from '@/type/types'
import { generateSlug } from '@/lib/generateSlug'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Brand } from '@prisma/client'
import { createBrand, updateBrandById } from '@/actions/brand'
import TextInput from '@/components/global/FormInputs/TextInputForm'


type BrandFormProps = {
  initialData?: Brand | null;
  editingId?: string;
}

const BrandForm = ({
  initialData,
  editingId,
}: BrandFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandProps>({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      status: initialData?.status || false,
      imageUrl: initialData?.imageUrl || null,
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

  const saveCategory = async(data: BrandProps) => {
    
    try {
      setIsLoading(true);
      
      data.imageUrl = fileUrl;
      data.status = status?.value as boolean;
      data.slug = generateSlug(data.title);
      if (editingId) {
        const updateBrand = await updateBrandById(editingId, data)
        console.log("Updated brand:", updateBrand);
        
        if (updateBrand) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/brands`);
        }
      } else {
        const newBrand = await createBrand(data);
        
        if (newBrand) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/brands`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update brand:", error);
    }
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader title={"Brand"} editingId={editingId} href={"/brands"} loading={isLoading} />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
          <ImageInput 
            title="Brand Logo"
            description="Update the brand logo"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
          /> 
        </div>  
        <form 
          onSubmit={handleSubmit(saveCategory)} 
          className='grid md:col-span-8 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Brand Status</CardTitle>
                    <CardDescription>Update the brand status</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        <Label htmlFor="brand">Status</Label>
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
                    <CardTitle>Brand Name</CardTitle>
                    <CardDescription>Update the brand name</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Brand Name"
                            name="title"
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
                  title={editingId ? "Update Brand" : "Save Brand"}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
        <div className='hidden md:grid sm:col-span-4 col-span-full space-y-6'>
          <ImageInput 
            title="Brand Logo"
            description="Update the brand logo"
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

export default BrandForm