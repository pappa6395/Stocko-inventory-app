"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { SubCategoryProps } from '@/type/types'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { generateSlug } from '@/lib/generateSlug'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import { MainCategory, SubCategory } from '@prisma/client'
import { createSubCategory, updateSubCategoryById } from '@/actions/subCategories'


type SubCategoryFormProps = {
  initialData?: SubCategory;
  editingId?: string;
  mainCategories: MainCategory[]
}
type SelectOptionProps = {
  value: string;
  label: string;
}

const SubCategoryForm = ({
  initialData,
  editingId,
  mainCategories
}: SubCategoryFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubCategoryProps>({
    defaultValues: {
      title: initialData?.title,
    }
  });

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);

  const mainCategoryOptions = mainCategories?.map((item) => {
      return {
        value: item.id.toString(),
        label: item.title,
      }
  });
  const initialMainCategoryId = initialData?.categoryId || 0;
  const initialCategory = mainCategoryOptions?.find(
    (item) => Number(item.value) === initialMainCategoryId);
  const [selectedMainCategory, setSelectedMainCategory] =
  useState<any>(initialCategory);

  const saveCategory = async(data: SubCategoryProps) => {
    
    try {
      setIsLoading(true);
      
      data.slug = generateSlug(data.title);
      if (editingId) {
        const updateCategory = await updateSubCategoryById(editingId, data)
        console.log("Updated category:", updateCategory);
        
        if (updateCategory) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/subcategories`);
        }
      } else {
        const newCategory = await createSubCategory(data);
        
        if (newCategory) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/subcategories`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update subcategory:", error);
    }
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader title={"SubCategory"} editingId={editingId} href={"/subcategories"} loading={isLoading} />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <form 
          onSubmit={handleSubmit(saveCategory)} 
          className='grid md:col-span-8 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            {/* Category Details */}
            <Card>
                <CardHeader>
                    <CardTitle>SubCategory Details</CardTitle>
                    <CardDescription>Update the SubCategory details</CardDescription>
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
      </div>
    </div>
    
  )
}

export default SubCategoryForm