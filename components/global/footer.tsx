
import React from 'react'
import Link from 'next/link'
import { belowFooter, footer } from '@/config/footer'

const Footer = () => {

  return (

    <footer className='py-8'>
        <div className='container'>
            <div className="grid gap-6 grid-cols-12 border-b 
            border-gray-200 py-10 items-start">
                <div className="col-span-full lg:col-span-4">
                    {footer.logo}
                    <p className='my-3 text-sm line-clamp-3'>
                        {footer.summary}
                    </p>
                    <div className='space-y-2'>
                        {footer?.contacts.map((item, i) => {
                            const Icon = item?.icon
                            return (
                                <div key={i} className='flex items-center gap-1'>
                                    <Icon className='size-4' />
                                    <p className='text-xs'>{item.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {footer.navigation?.map((item, i) => {
                    return (
                        <div key={i} className="col-span-full lg:col-span-2">
                            <h2 className='font-bold'>{item.title}</h2>
                            <div className='flex flex-col gap-3 py-2'>
                                {item.links.map((link,i) => {
                                    return (
                                        <div key={i}>
                                            <Link href={link.path} className='text-xs'>
                                                {link.title}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='py-3 flex md:flex-row flex-col justify-between gap-4 md:gap-0'>
                <div className='flex md:flex-row flex-col'>
                    <div className='flex'>
                        {belowFooter.reserve.icon}
                        <p className='ml-1 text-sm font-semibold'>
                            2025 {belowFooter.reserve.title}
                        </p>
                    </div>
                    <p className='ml-2 text-sm'>
                        {belowFooter.reserve.text}
                    </p>
                </div>
                <div className='flex flex-col md:flex-row px-2 md:px-0 md:gap-4'>
                    {belowFooter.policy.map((item, i) => {
                        return (
                            <div key={i} >
                                <Link 
                                href={item.path} 
                                className='text-sm font-medium hover:text-muted-foreground'
                            >
                                {item.title}
                            </Link>
                            </div>
                        )
                    })}
                </div>
                <div className='flex gap-3'>
                    {belowFooter.socialLink.map((item, i) => {
                        return (
                            <div key={i} className='flex items-center gap-1'>
                                <Link href={item.path}>
                                    <item.icon className='size-5' />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </footer>

  )
}

export default Footer