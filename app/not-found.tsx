"use client"

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {

    const router = useRouter()
    const handleGoBack = () => {
        router.back()
    }

  return (
    
    <section className="container bg-slate-100 dark:bg-gray-900 ">
        <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
            <div className="wf-ull lg:w-1/2">
                <p className="text-2xl font-semibold text-blue-500 dark:text-blue-400">404 error</p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We lost this page</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn't exist.</p>

                <div className="flex items-center mt-6 gap-x-3">
                    <Button onClick={handleGoBack} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                        <ArrowLeft />
                        <span>Go back</span>
                    </Button>
                    <Button asChild className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <Link href="/">
                            Take me home
                        </Link>
                    </Button>
                </div>

            </div>

            <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
                <img className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover " src="https://images.unsplash.com/photo-1508881598441-324f3974994b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="image"/>
            </div>
        </div>
    </section>

  )
}

export default NotFound