"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { UnitProps } from '@/type/types'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import { Unit } from '@prisma/client'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import { createUnit, updateUnitById } from '@/actions/units'
import TextArea from '@/components/global/FormInputs/TextAreaInput'


type RoleFormProps = {
  initialData?: Unit | null;
  editingId?: string;
}

const RoleForm = ({
  initialData,
  editingId,
}: RoleFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnitProps>({
    defaultValues: {
      title: initialData?.title || "",
      abbreviation: initialData?.abbreviation || "",
    }
    
  });

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const options: any[] = [
    { value: true, label: "Active" },
    { value: false, label: "Disabled" },
  ];

  const saveUnit = async(data: UnitProps) => {
    
    try {
      setIsLoading(true);
      
      if (editingId) {
        const updateUnit = await updateUnitById(editingId, data)
        console.log("Updated unit:", updateUnit);
        
        if (updateUnit) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/units`);
        }
      } else {
        const newUnit = await createUnit(data);
        
        if (newUnit) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/units`);
        } else {
          toast.error("Failed to create unit");
          reset();
          setIsLoading(false);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update unit:", error);
    }
  }

  const handleBack = () => {
    router.back()
  };

  return (

    <div>
      <FormHeader 
        title={"Role"} 
        editingId={editingId}
        parent={"/users"}
        href={"/roles"} 
        loading={isLoading} 
      />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <form 
          onSubmit={handleSubmit(saveUnit)} 
          className='grid col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Roles</CardTitle>
                    <CardDescription>Update the role details</CardDescription>
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
                  title={editingId ? "Update Unit" : "Save Unit"}
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

export default RoleForm