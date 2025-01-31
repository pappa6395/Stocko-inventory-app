import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {

  return (

    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <div className='py-8 px-4 max-w-6xl mx-auto w-full my-4'>
        {children}
        </div>
      </div>
    </div>
  )
}

export default Layout