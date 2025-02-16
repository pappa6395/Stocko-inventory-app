"use client"

import React from 'react'
import parse from 'html-react-parser';

const ProductContent = ({codeString}: {codeString: string;}) => {

  return (

    <div>
        {parse(`${codeString}`)}
    </div>

  )
}

export default ProductContent