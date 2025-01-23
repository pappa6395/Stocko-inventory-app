import { cn } from '@/lib/utils'
import { Package2 } from 'lucide-react'
import React from 'react'

const Logo = ({
  classNameLogo, 
  classNameText,
  classNameFrame
}
  : {
    classNameLogo?: string; 
    classNameText?: string;
    classNameFrame?: string;
  }) => {

  return (

    <div className='flex items-center gap-2'>
        <div className={cn('flex items-center flex-shrink-0 justify-center size-10 rounded-full bg-slate-900 text-slate-50', classNameFrame)}>
            <Package2 className={cn('size-6', classNameLogo)} />
        </div>
        <h2 className={cn('font-bold text-xl', classNameText)}>
            Stocko-Online
        </h2>
    </div>

  )
}

export default Logo