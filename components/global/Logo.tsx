import { cn } from '@/lib/utils'
import { Package2 } from 'lucide-react'
import Image from 'next/image';
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
        <div className={cn('flex items-center flex-shrink-0 justify-center rounded-full text-slate-50', classNameFrame)}>
            <Image 
              src={"/StockOnline.png"} 
              alt="logo" 
              width={100} height={100}
              className={cn(classNameLogo)}
            />
        </div>
        <h2 className={cn('font-bold text-xl', classNameText)}>
            Stocko-Online
        </h2>
    </div>

  )
}

export default Logo