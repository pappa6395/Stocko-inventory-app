"use client"

import { Button } from '@/components/ui/button';
import { ListFilter, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { RiFileExcel2Fill, RiFileExcel2Line } from'react-icons/ri';
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Select from "react-tailwindcss-select";

type Checked = DropdownMenuCheckboxItemProps["checked"]

const TableHeader = () => {

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [status, setStatus] = React.useState<any>(null);
  const [date, setDate] = React.useState<any>(null)

  const options: any[] = [
    { value: true, label: "Active" },
    { value: false, label: "Disabled" },
  ];
  const dateOptions: any[] = [
    { value: "last week", label: "Last week" },
    { value: "last month", label: "Last month" },
  ];

  return (

    <div className='mb-3'>
        <div className='flex justify-between items-center border-b 
        border-gray-200 dark:border-gray-600 py-3'>
            <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                Categories
            </h2>
            <div className='flex items-center space-x-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <ListFilter />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                        checked={showStatusBar}
                        onCheckedChange={setShowStatusBar}
                        >
                        Status Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                        checked={showActivityBar}
                        onCheckedChange={setShowActivityBar}
                        disabled
                        >
                        Activity Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                        checked={showPanel}
                        onCheckedChange={setShowPanel}
                        >
                        Panel
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button asChild variant={"outline"}>
                    <Link href={"#"}>
                        <RiFileExcel2Line />
                        Export
                    </Link>
                </Button>
                <Button asChild variant={"outline"}>
                    <Link href={"#"}>
                        <RiFileExcel2Fill />
                        Import
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/dashboard/inventory/categories/new">
                        New Category
                    </Link>
                </Button>
            </div>
        </div>
        <div className='flex justify-between items-center mt-2'>
            <div className="relative">
                <div className='absolute flex items-center 
                inset-y-0 left-0 pl-3 pointer-events-none'>
                    <Search className='text-slate-300 size-4' />
                </div>
                <input
                id="search"
                name="search"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 
                text-base text-gray-900 outline outline-1 -outline-offset-1 
                outline-gray-300 placeholder:text-gray-400 focus:outline 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                sm:text-sm/6 ps-8"
                />
            </div>
            <div className='flex items-center gap-4'>
                <div className="grid gap-3">
                    <Select
                        value={date}
                        onChange={(value: any) => setDate(value)}
                        options={dateOptions} 
                        primaryColor={'primary'}
                    />
                </div>
                <div className="grid gap-3">
                    <Select
                        value={status}
                        onChange={(value: any) => setStatus(value)}
                        options={options} 
                        primaryColor={'primary'}
                    />
                </div>
            </div>
        </div>
    </div>

  )
}

export default TableHeader