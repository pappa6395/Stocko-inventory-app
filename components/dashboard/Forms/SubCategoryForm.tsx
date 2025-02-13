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
import { Category, MainCategory, SubCategory } from '@prisma/client'
import { createSubCategory, updateSubCategoryById } from '@/actions/subCategories'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'


type SubCategoryFormProps = {
  initialData?: SubCategory | null;
  editingId?: string;
  categories: Category[]
}

const SubCategoryForm = ({
  initialData,
  editingId,
  categories
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
  const categoryOptions = categories?.map((item) => {
        return {
          value: item.id.toString(),
          label: item.title,
        }
      });
      const initialCategoryId = initialData?.categoryId || 0;
      const initialCategory = categoryOptions?.find(
        (item) => Number(item.value) === initialCategoryId);
      const [selectedCategory, setSelectedCategory] =
      useState<any>(initialCategory);

  const [isLoading, setIsLoading] = useState(false);


  const saveCategory = async(data: SubCategoryProps) => {
    
    try {
      setIsLoading(true);
      data.categoryId = Number(selectedCategory.value);
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
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <form 
          onSubmit={handleSubmit(saveCategory)}
          className='grid md:col-span-12 col-span-full gap-4'>
            <FormHeader title={"SubCategory"} editingId={editingId} href={"/subcategories"} loading={isLoading} /> 
          <div className='grid sm:grid-cols-12 grid-cols-1 space-y-4 mx-4'>
            {/* Category Details */}
            <div className='col-span-full md:col-span-8'>
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
                          <div className="space-x-2">
                            <FormSelectInput
                            label="Categories"
                            options={categoryOptions}
                            option={selectedCategory}
                            setOption={setSelectedCategory}
                            toolTipText='Add new subcategory'
                            href={"/dashboard/inventory/subcategories/new"}
                            />
                          </div>
                      </div>
                  </CardContent>
              </Card>
            </div>
            <div className='col-span-full py-6'>
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
                  size={"lg"}
                  title={editingId ? "Update SubCategory" : "Save SubCategory"}
                  loading={isLoading}
                  loadingTitle={editingId ? "Updating..." : "Saving..."}
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