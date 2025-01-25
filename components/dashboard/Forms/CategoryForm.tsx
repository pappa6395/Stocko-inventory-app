"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import TextArea from '@/components/global/FormInputs/TextAreaInput'
import Select from "react-tailwindcss-select";
import { useForm } from 'react-hook-form';
import { CategoryProps } from '@/type/types'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { uploadFile } from '@/utils/uploadFile'
import Image from 'next/image'
import { generateSlug } from '@/lib/generateSlug'
import { createCategory } from '@/actions/category'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'


const CategoryForm = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryProps>();

  const router = useRouter()
  const [status, setStatus] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const options: any[] = [
    { value: true, label: "Active" },
    { value: false, label: "Disabled" },
  ];

  const saveCategory = async(data: CategoryProps) => {
    
    try {
      setIsLoading(true);
      
      data.imageUrl = fileUrl;
      data.status = status?.value as boolean;
      data.slug = generateSlug(data.title);

      const newCategory = await createCategory(data);
      console.log("New category:", newCategory);
        
        if (newCategory) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/categories`);
        }
    } 
      catch (error) {
        console.error("Failed to save category:", error);
    }
  };


  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader title={"Category"} onClick={handleBack} />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
          <ImageInput 
            title="Category Image"
            description="Update the category image"
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
            {/* Category Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Category Status</CardTitle>
                    <CardDescription>Update the product details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={status}
                          onChange={(value: any) => setStatus(value)}
                          options={options} 
                          primaryColor={'primary'}
                        />
                    </div>
                </CardContent>
            </Card>
            {/* Category Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Update the product details</CardDescription>
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
                          <TextArea
                            register={register}
                            errors={errors}
                            label="Description"
                            name="description"
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
                  Discard
                </Button>
                <SubmitButton
                  size={"sm"}
                  title={"Save Category"}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
        <div className='hidden md:grid sm:col-span-4 col-span-full space-y-6'>
          <ImageInput 
            title="Category Image"
            description="Update the category image"
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

export default CategoryForm