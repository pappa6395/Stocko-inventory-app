"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { MainCategoryProps } from '@/type/types'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { generateSlug } from '@/lib/generateSlug'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import { MainCategory } from '@prisma/client'
import { createMainCategory, updateMainCategoryById } from '@/actions/main-categories'


type MainCategoryFormProps = {
  initialData?: MainCategory | null;
  editingId?: string;
}

const MainCategoryForm = ({
  initialData,
  editingId,
}: MainCategoryFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MainCategoryProps>({
    defaultValues: {
      title: initialData?.title?? "",
    }
  });

  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(false);

  const saveCategory = async(data: MainCategoryProps) => {
    
    try {
      setIsLoading(true);
      data.slug = generateSlug(data.title);

      if (editingId) {
        const updateCategory = await updateMainCategoryById(editingId, data)
        console.log("Updated category:", updateCategory);
        
        if (updateCategory) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/main-categories`);
        }
      } else {
        const newCategory = await createMainCategory(data);
        
        if (newCategory) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/main-categories`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update main category:", error);
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
            <FormHeader title={"Main Category"} editingId={editingId} href={"/main-categories"} loading={isLoading} />
          <div className='grid sm:grid-cols-12 grid-cols-1 space-y-4 px-4'>
            {/* Category Details */}
            <div className='md:col-span-8 col-span-full'>
              <Card>
                  <CardHeader>
                      <CardTitle>Main Category Details</CardTitle>
                      <CardDescription>Update the Main Category details</CardDescription>
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

export default MainCategoryForm