"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import TextArea from '@/components/global/FormInputs/TextAreaInput'
import Select from "react-tailwindcss-select";
import { useForm } from 'react-hook-form';
import { BannerProps, CategoryProps } from '@/type/types'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { generateSlug } from '@/lib/generateSlug'
import { createCategory, updateCategoryById } from '@/actions/category'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Banner, Category, MainCategory } from '@prisma/client'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'
import { createBanner, updateBannerById } from '@/actions/banners'


type BannerFormProps = {
  initialData?: Banner | null;
  editingId?: string;
}

const BannerForm = ({
  initialData,
  editingId,
}: BannerFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BannerProps>({
    defaultValues: {
      title: initialData?.title?? "",
      bannerLink: initialData?.bannerLink?? "",
      position: initialData?.position?? "",
      
    }
  });

  const router = useRouter()

  // Status
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

  const saveBanner = async(data: BannerProps) => {
    
    try {
      setIsLoading(true);
      
      data.imageUrl = fileUrl;
      data.status = status?.value as boolean;

      if (editingId) {
        const updateBanner = await updateBannerById(editingId, data)
        console.log("Updated banner:", updateBanner);
        
        if (updateBanner) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/banners`);
        }
      } else {
        const newBanner = await createBanner(data);
        
        if (newBanner) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/banners`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update category:", error);
    }
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader title={"Banner"} editingId={editingId} href={"/banners"} loading={isLoading} />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
          <ImageInput 
            title="Banner Image"
            description="Update the banner image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
          /> 
        </div>  
        <form 
          onSubmit={handleSubmit(saveBanner)} 
          className='grid md:col-span-8 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            {/* Category Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Banner</CardTitle>
                    <CardDescription>Update the banner details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="grid gap-3 pt-1.5">
                        <Label htmlFor="banner">Status</Label>
                        <Select
                          value={status}
                          onChange={(value: any) => setStatus(value)}
                          options={options} 
                          primaryColor={'primary'}
                        />
                    </div>
                  </div>
                </CardContent>
            </Card>
            {/* Category Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Banner Details</CardTitle>
                    <CardDescription>Update the banner details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Title"
                            name="title"
                          />
                        </div>
                        <div className="grid gap-3">
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Position"
                            name="position"
                          />
                        </div>
                        <div className="grid gap-3">
                        <TextInput
                            register={register}
                            errors={errors}
                            label="Banner Link"
                            name="bannerLink"
                          />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='grid py-6'>
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
                  title={editingId ? "Update Banner" : "Save Banner"}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
        <div className='hidden md:grid sm:col-span-4 col-span-full space-y-6'>
          <ImageInput 
            title="Banner Image"
            description="Update the banner image"
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

export default BannerForm