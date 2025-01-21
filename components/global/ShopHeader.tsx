import React from 'react'
import Logo from './Logo'
import { Button } from '../ui/button'
import { LayoutGrid, ShoppingBasket } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import Image from 'next/image'

const ShopHeader = () => {
  return (
    <header className='py-3'>
        <div className='container'>
            <div className='flex items-center justify-between gap-2'>
                <div className="flex gap-2">
                    <Logo />
                    <Button variant={"outline"} className='rounded-lg'>
                        <LayoutGrid className='size-4' />
                        <span className='text-xs'>Catalog</span>
                    </Button>
                </div>
                <div className="flex-1">
                        <input 
                            type="search" 
                            name="search" 
                            id="search" 
                            autoComplete="search"
                            placeholder='Search here...' 
                            required 
                            className="block w-full rounded-md bg-white px-3 
                            py-1.5 text-base text-gray-900 outline outline-1 
                            -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                            focus:outline focus:outline-2 focus:-outline-offset-2 
                            focus:outline-indigo-600 sm:text-sm/6" 
                        />
                    </div>
                    <div className="flex gap-1">
                        <Button 
                            variant={"outline"} 
                            size={"icon"} 
                            className='rounded-full'
                        >
                            <ShoppingBasket className='size-6 rounded-full'/>
                        </Button>
                        <Button 
                            variant={"outline"} 
                            size={"icon"} 
                            className='rounded-full'>
                            <Image
                                src={"/profile.svg"}
                                alt="profile"
                                width={24}
                                height={24} 
                                className='size-6 rounded-full'
                            />
                        </Button>
                    </div>
                <ModeToggle />
            </div>
        </div>
    </header>
  )
}

export default ShopHeader