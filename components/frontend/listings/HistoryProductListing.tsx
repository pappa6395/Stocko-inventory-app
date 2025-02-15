"use client"

import React from 'react'
import ProductListing from './ProductListing'
import { useAppSelector } from '@/redux/hooks/hooks'
import { IProducts } from '@/type/types';


const HistoryProductListing = () => {
    const historyItems = useAppSelector((state) => state.history.historyItems);

  return (

    <div>
        {historyItems && historyItems.length > 0 && (
            <ProductListing 
                title="Browsing History" 
                detailLink={"#"} 
                products={historyItems as IProducts[]} 
                cardType='cart'
                className='bg-gradient-to-r from-sky-500 to-white 
                dark:from-slate-700 dark:to-slate-500 rounded-lg'
          />
        )}
    </div>
  )
}

export default HistoryProductListing