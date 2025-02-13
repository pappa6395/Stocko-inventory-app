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
import { AdvertProps, BannerProps, CategoryProps } from '@/type/types'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { generateSlug } from '@/lib/generateSlug'
import { createCategory, updateCategoryById } from '@/actions/category'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Advert, Banner, Category, MainCategory } from '@prisma/client'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'
import { createBanner, updateBannerById } from '@/actions/banners'
import { createAdvert, updateAdvertById } from '@/actions/adverts'
import RadioInput from '@/components/global/FormInputs/RadioInput'


type AdvertFormProps = {
  initialData?: Advert | null;
  editingId?: string;
}

const AdvertForm = ({
  initialData,
  editingId,
}: AdvertFormProps) => {
  
  const sizeOptions: any[] = [
    { id: "SMALL", label: "Small" },
    { id: "MEDIUM", label: "Medium" },
    { id: "LARGE", label: "Large" },
    { id: "EXTRA_LARGE", label: "Extra Large" },
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdvertProps>({
    defaultValues: {
      title: initialData?.title?? "",
      advertLink: initialData?.advertLink?? "",
      position: initialData?.position?? "",
      size: initialData?.size?? "SMALL",
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

  const saveAdvert = async(data: AdvertProps) => {
    
    try {
      setIsLoading(true);
      
      data.imageUrl = fileUrl;
      data.status = status?.value as boolean;

      if (editingId) {
        const updateAdvert = await updateAdvertById(editingId, data)
        console.log("Updated advert:", updateAdvert);
        
        if (updateAdvert) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/adverts`);
        }
      } else {
        const newAdvert = await createAdvert(data);
        
        if (newAdvert) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/adverts`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update advert:", error);
    }
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader title={"Advert"} editingId={editingId} href={"/adverts"} loading={isLoading} />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
          <ImageInput 
            title="Advert Image"
            description="Update the advert image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
          /> 
        </div>  
        <form 
          onSubmit={handleSubmit(saveAdvert)} 
          className='grid md:col-span-8 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            {/* Category Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Advert</CardTitle>
                    <CardDescription>Update the advert details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="grid gap-3 pt-1.5">
                        <Label htmlFor="advert">Status</Label>
                        <Select
                          value={status}
                          onChange={(value: any) => setStatus(value)}
                          options={options} 
                          primaryColor={'primary'}
                        />
                    </div>
                    <div className="grid col-span-full gap-3 pt-1.5">
                        <RadioInput
                          radioOptions={sizeOptions}
                          label="Advert Size"
                          register={register}
                          name="size"
                          errors={errors}
                        />
                    </div>
                  </div>
                </CardContent>
            </Card>
            {/* Category Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Advert Details</CardTitle>
                    <CardDescription>Update the advert details</CardDescription>
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
                            label="Advert Link"
                            name="advertLink"
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
                  title={editingId ? "Update Advert" : "Save Advert"}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
        <div className='hidden md:grid sm:col-span-4 col-span-full space-y-6'>
          <ImageInput 
            title="Advert Image"
            description="Update the advert image"
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

export default AdvertForm