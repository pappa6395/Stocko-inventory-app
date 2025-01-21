import { Package2 } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (

    <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center size-10 rounded-full bg-slate-900 text-slate-50'>
            <Package2 className='size-6' />
        </div>
        <h2 className='font-bold text-xl'>
            Stocko-Online
        </h2>
    </div>

  )
}

export default Logo