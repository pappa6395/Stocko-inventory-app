"use client"

import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const FormHeader = ({
    title,
    editingId,
    onClick
}: {
    title: string
    editingId?: string;
    onClick?: (data:any) => typeof data;
}) => {

    const router = useRouter()
    const handleBack = () => {
        router.back()
    }

  return (

    <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
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
    </div>

  )
}

export default FormHeader