import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Slash } from 'lucide-react'

export type CustomBreadCrumbProps = {
    breadCrumb: BreadCrumbItem[];
}
export type BreadCrumbItem = {
    label: string;
    href: string;
}


const CustomBreadCrumb = ({breadCrumb}: CustomBreadCrumbProps) => {

  return (

    <Breadcrumb>
    <BreadcrumbList>
        {breadCrumb.map((b, index) => {
            const isLast = index === breadCrumb.length - 1;
            return (
                <div key={index} className='flex items-center'>
                    <BreadcrumbItem>
                        {isLast ? (
                            <BreadcrumbPage 
                                className='font-semibold text-emerald-500'
                            >
                                {b.label}
                            </BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink href={b.href}>{b.label}</BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                </div>
            )}
        )}
    </BreadcrumbList>
  </Breadcrumb>

  )
}

export default CustomBreadCrumb