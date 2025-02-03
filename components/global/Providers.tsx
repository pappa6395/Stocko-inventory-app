"use client"

import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const Providers = ({children}: {children: ReactNode}) => {
  return (

    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        <Toaster position='top-center' reverseOrder={false} />
        <Provider store={store}>{children}</Provider>
    </ThemeProvider>

  )
}

export default Providers