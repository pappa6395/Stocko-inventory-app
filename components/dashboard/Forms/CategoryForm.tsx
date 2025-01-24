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
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  }

  const saveCategory = async(data: CategoryProps) => {
    
    try {
      setIsLoading(true);
      if (!file) throw new Error("No file selected");
      const result = await uploadFile(file, "/api/sign");
      if (!result) throw new Error("Failed to upload file");
      setFileUrl(result.secure_url);
      data.imageUrl = fileUrl;
      data.status = status?.value as boolean;
      data.slug = generateSlug(data.title);
      
      try {
        const newCategory = await createCategory(data);
        console.log("New category:", newCategory);
        
        if (newCategory) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/categories`);
        }
      } catch (err) {
        console.error("Failed to save category:",err);
      }
      
    } catch (error) {
      console.error(error);
    }
    
  };

  const handleUploadImage = async (file: File) => {
    if (!file) throw new Error("No file selected");
    const result = await uploadFile(file, "/api/sign");
    if (!result) throw new Error("Failed to upload file");
    setFileUrl(result.secure_url);
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <form onSubmit={handleSubmit(saveCategory)}>
        <FormHeader title={"Category"} />
        <div className='grid grid-cols-12 py-4 gap-4'>
            <div className='sm:col-span-8 col-span-full '>
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
                      size="sm"
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
            <div className='sm:col-span-4 col-span-full space-y-6'>
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
                <Card>
                    <CardHeader>
                        <CardTitle>Category Images</CardTitle>
                        <CardDescription>Update the product details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            <Label htmlFor="category">Category</Label>
                              <div className="grid gap-2">
                                <Image
                                  alt="Category image"
                                  className="aspect-square w-full rounded-md object-contain"
                                  height={400}
                                  src={fileUrl ||"/placeholder.svg"}
                                  width={400}
                                  />
                              </div>
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                className="block w-full text-sm file:mr-4 
                                file:rounded-md file:border-0 file:bg-neutral-900 dark:file:bg-slate-50
                                file:py-2.5 file:px-4 file:text-sm file:font-medium
                                file:text-white dark:file:text-black hover:file:bg-neutral-800 
                                file:cursor-pointer focus:outline-none
                                disabled:pointer-events-none disabled:opacity-60"
                              />
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button type={"submit"} variant="outline" className="w-full">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                        </Button>
                    </CardFooter>
                </Card>
            </div>  
        </div>
      </form> 

    </div>
    
  )
}

export default CategoryForm