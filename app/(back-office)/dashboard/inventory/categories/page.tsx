
import { getAllCategories } from '@/actions/category'
import { Button } from '@/components/ui/button'
import { CategoryProps } from '@/type/types'
import Link from 'next/link'
import React from 'react'




const page = async () => {

  const categories = await getAllCategories() as CategoryProps[]

  return (

    <div>
        <Button asChild>
            <Link href="/dashboard/inventory/categories/new">
                New Category
            </Link>
        </Button>
        {categories && categories.length > 0 && categories.map((item, i) => {
          return (
            <div key={i}>
              {item.title}
            </div>
          )
        })}
    </div>

  )
}

export default page