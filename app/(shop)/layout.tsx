import Footer from '@/components/global/footer'
import ShopHeader from '@/components/global/ShopHeader'
import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className=''>
      <div className=''>
        <ShopHeader />
      </div>
      {children}
       <Footer />
    </div>
  )
}

export default layout