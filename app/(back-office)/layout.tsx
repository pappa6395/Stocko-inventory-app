import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {

  return (

    <div>
        <div className='flex'>
        <div>
            Sidebar
        </div>
        <div>
            Navbar
            {children}
        </div>
        </div>
    </div>
  )
}

export default Layout