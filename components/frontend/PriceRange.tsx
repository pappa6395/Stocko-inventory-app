"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DollarSign } from 'lucide-react'


const PriceRange = () => {

    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

    const params = useSearchParams()
    const sort = params.get("sort") ?? "desc";
    const type = params.get("type");
    const router = useRouter();
    const pathname = usePathname();

    const handleSubmit = () => {
       console.log(minPrice, maxPrice);
       if (maxPrice && minPrice) {
        router.push(
          `${pathname}?type=${type}&&sort=${sort}&&min=${minPrice}&&max=${maxPrice}`
        );
      } else if (minPrice) {
        router.push(`${pathname}?type=${type}&&sort=${sort}&&min=${minPrice}`);
      } else if (maxPrice) {
        router.push(`${pathname}?type=${type}&&sort=${sort}&&max=${maxPrice}`);
      } else {
        return;
      }
        // fetch products with price range
    }

  return (

    <div>
        <h2 className='text-lg font-bold tracking-tight'>Price</h2>
        <div className='flex gap-2 items-center justify-center'>
            <div className='relative flex items-center gap-2'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1'>
                    <DollarSign className='text-gray-400 w-4 h-4'/>
                </div>
                <input 
                    type="number" 
                    id="minPrice"
                    value={minPrice} 
                    onChange={(e) => setMinPrice(e.target.value)}
                    name="minPrice" 
                    placeholder='Min'
                    className="w-full text-xs border rounded-md pl-6
                    shadow-sm focus:outline-none focus:ring-primary focus:ring-2"
                />
            </div>
            <div className='relative flex items-center gap-2'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1'>
                    <DollarSign className='text-gray-400 w-4 h-4'/>
                </div>
                <input 
                    type="number" 
                    id="maxPrice" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    name="maxPrice"
                    placeholder='Max' 
                    className="w-full text-xs border rounded-md pl-6
                    shadow-sm focus:outline-none focus:ring-primary focus:ring-2"
                />
            </div>
            <Button variant={"outline"} size={"default"} type={"button"} onClick={handleSubmit}>Go</Button>
        </div>
    </div>

  )
}

export default PriceRange