"use client"

import CloseBtn from '@/components/global/FormInputs/CloseBtn'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const FormHeader = ({
    title,
    editingId,
    href,
    loading,
    parent
}: {
    title: string
    editingId?: string;
    href: string;
    loading: boolean;
    parent?: string;
}) => {

    const router = useRouter()
    const handleBack = () => {
        router.back()
    }

  return (

    <div className="grid flex-1 auto-rows-max gap-4">
        <div className="flex items-center justify-between gap-4">
            <div className='flex gap-3'>
                <Button 
                    onClick={handleBack}
                    variant="outline" 
                    type="button"
                    size="icon" 
                    className="h-7 w-7"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {editingId ? "Update" : "Create"} {title}
                </h1>
            </div>
            <div className='mr-4 flex gap-2'>
                <CloseBtn href={href} size="sm" parent={parent} />
                <SubmitButton
                    title={editingId ? `Update ${title}` : `Save ${title}`}
                    size={"sm"}
                    loading={loading} 
                    loadingTitle={editingId ? `Updating...` : `Saving...`}
                />
            </div>
        </div>
    </div>
  )
}

export default FormHeader