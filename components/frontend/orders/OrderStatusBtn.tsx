"use client"

import { LineOrder } from '@prisma/client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import React, { useState } from 'react'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import { FileBox } from 'lucide-react'
import { changeOrderStatusById } from '@/actions/orders'
import toast from 'react-hot-toast'

type OrderStatusProps = {
    order: LineOrder | null,
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void,
}

const OrderStatusBtn = (props: OrderStatusProps) => {

    const { order, isOpen, setIsOpen } = props
    const orderStatus = [
        {
            value: "DELIVERED",
            label: "Delivered",
        },
        {
            value: "PROCESSING",
            label: "Processing",
        },
        {
            value: "SHIPPED",
            label: "Shipped",
        },
        {
            value: "PENDING",
            label: "Pending",
        },
        {
            value: "CANCELLED",
            label: "Cancelled",
        }
    ]
    const initialOrderStatus= {
        value: order?.status || "DELIVERED",
        label: order?.status || "Delivered",
    }
    const [selectedStatus, setSelectedStatus] = useState<any>(initialOrderStatus);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const orderId = Number(order?.id)
        const orderStatus = selectedStatus.value
        try {
            const updateStatus = await changeOrderStatusById(orderId, orderStatus)
            if (updateStatus?.status === "200") {
                setSelectedStatus({
                    value: updateStatus.data?.status,
                    label: updateStatus.data?.status,
                })
                setProcessing(false);
                setIsOpen(false);
                toast.success("Order Status updated successfully")
                
            }

        } catch (err) {
            console.error("Failed to update order status:", err);
            toast.error("Failed to update order status. Please try again.");
            setProcessing(false);
            setIsOpen(false);
        }
        
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
            {selectedStatus?.value === "DELIVERED" ? (
            <button className="dark:text-slate-800 py-1.5 px-3 bg-green-200 rounded-full">
                {selectedStatus.label}
            </button>
            ) : selectedStatus?.value === "PROCESSING" ? (
            <button className="dark:text-slate-800 py-1.5 px-3 bg-yellow-200 rounded-full">
                {selectedStatus.label}
            </button>
            ) : selectedStatus?.value === "PENDING" ? (
            <button className="dark:text-slate-800 py-1.5 px-3 bg-orange-200 rounded-full">
                {selectedStatus.label}
            </button>
            ) : (
            <button className="dark:text-slate-800 py-1.5 px-3 bg-red-200 rounded-full">
                {selectedStatus.label}
            </button>
            )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Order Status</DialogTitle>
          <DialogDescription>
             Select Status
          </DialogDescription>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <FormSelectInput
                    label="Status"
                    options={orderStatus}
                    option={selectedStatus}
                    setOption={setSelectedStatus}
                    toolTipText='Select new status'
                    labelShown={false}
                />
                <DialogFooter>
                    <SubmitButton
                        title='Update Status'
                        loading={processing}
                        loadingTitle={processing ? 'Updating...' : 'Update Status' }
                        buttonIcon={FileBox}
                        className='bg-blue-500'
                    />
                </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    
  )
}

export default OrderStatusBtn