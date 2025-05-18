import { cn } from '@/lib/utils'
import { Package2 } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

const Logo = ({
  classNameLogo, 
  classNameText,
  classNameFrame,
  labelShown = true
}
  : {
    classNameLogo?: string; 
    classNameText?: string;
    classNameFrame?: string;
    labelShown?: boolean;
  }) => {

  return (

    <div className='flex items-center gap-2'>
        <div className={cn('flex flex-shrink-0 justify-center rounded-full text-slate-50', classNameFrame)}>
            <Image 
              src={"/StockOnline.png"} 
              alt="logo" 
              width={100} height={100}
              className={cn("",classNameLogo)}
            />
        </div>
        {labelShown && <h2 className={cn('font-bold text-xl pt-2.5', classNameText)}>Stocko-Online</h2>}
    </div>

  )
}

export default Logo