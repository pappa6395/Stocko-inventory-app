"use client"

import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { SessionProvider } from 'next-auth/react';

const Providers = ({children}: {children: ReactNode}) => {
  return (

    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        <Toaster position='top-center' reverseOrder={false} />
        <Provider store={store}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </Provider>
    </ThemeProvider>

  )
}

export default Providers