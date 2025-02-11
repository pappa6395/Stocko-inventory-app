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
import { CategoryProps } from '@/type/types'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { generateSlug } from '@/lib/generateSlug'
import { createCategory, updateCategoryById } from '@/actions/category'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Category, MainCategory } from '@prisma/client'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'


type CategoryFormProps = {
  initialData?: Category | null;
  editingId?: string;
  mainCategories: MainCategory[]
}

const CategoryForm = ({
  initialData,
  editingId,
  mainCategories
}: CategoryFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryProps>({
    defaultValues: {
      title: initialData?.title?? "",
      description: initialData?.description?? "",
      imageUrl: initialData?.imageUrl?? "",
      status: initialData?.status?? true,
      slug: initialData?.slug?? "",
    }
  });

  const router = useRouter()

  // Main Categories
  const mainCategoryOptions = mainCategories?.map((item) => {
      return {
        value: item.id.toString(),
        label: item.title,
      }
    });
    const initialMainCategoryId = initialData?.mainCategoryId || 0;
    const initialCategory = mainCategoryOptions?.find(
      (item) => Number(item.value) === initialMainCategoryId);
    const [selectedMainCategory, setSelectedMainCategory] =
    useState<any>(initialCategory);

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

  const saveCategory = async(data: CategoryProps) => {
    
    try {
      setIsLoading(true);
      
      data.imageUrl = fileUrl;
      data.status = status?.value as boolean;
      data.slug = generateSlug(data.title);
      data.mainCategoryId = Number(selectedMainCategory.value);
      if (editingId) {
        const updateCategory = await updateCategoryById(editingId, data)
        console.log("Updated category:", updateCategory);
        
        if (updateCategory) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/categories`);
        }
      } else {
        const newCategory = await createCategory(data);
        
        if (newCategory) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/categories`);
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
      <FormHeader title={"Category"} editingId={editingId} href={"/categories"} loading={isLoading} />
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
                    <CardTitle>Category</CardTitle>
                    <CardDescription>Update the product details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="space-x-2">
                      <FormSelectInput
                      label="Main Categories"
                      options={mainCategoryOptions}
                      option={selectedMainCategory}
                      setOption={setSelectedMainCategory}
                      toolTipText='Add new main category'
                      href={"/dashboard/inventory/main-categories/new"}
                      />
                    </div>
                    <div className="grid gap-3 pt-1.5">
                        <Label htmlFor="category">Status</Label>
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
                    <CardTitle>Category Details</CardTitle>
                    <CardDescription>Update the Category details</CardDescription>
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
                  Close
                </Button>
                <SubmitButton
                  size={"sm"}
                  title={editingId ? "Update Category" : "Save Category"}
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