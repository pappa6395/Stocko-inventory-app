import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from 'react-hot-toast';


const Providers = ({children}: {children: ReactNode}) => {
  return (

    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <Toaster position='top-center' reverseOrder={false} />
        {children}
    </ThemeProvider>

  )
}

export default Providers