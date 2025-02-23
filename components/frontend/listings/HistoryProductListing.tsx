"use client"

import React, { useEffect } from 'react'
import ProductListing from './ProductListing'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { IProducts } from '@/type/types';
import { loadHistory } from '@/redux/slices/historySlice';


const HistoryProductListing = () => {
    const historyItems = useAppSelector((state) => state.history.historyItems);
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(
        loadHistory()
      );
    }, []);

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