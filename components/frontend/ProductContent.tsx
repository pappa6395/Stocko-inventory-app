"use client"

import React from 'react'
import parse from 'html-react-parser';

const ProductContent = ({codeString}: {codeString: string;}) => {

  return (

    <div className='py-6 prose lg:prose-xl 
    dark:text-slate-50 dark:prose-headings:text-slate-50
    dark:prose-strong:text-slate-50'>
        {parse(`${codeString}`)}
    </div>

  )
}

export default ProductContent