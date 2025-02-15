import { PageProps } from '@/.next/types/app/(shop)/page';
import { getProductsByCategorySlug } from '@/actions/products';
import CustomBreadCrumb from '@/components/frontend/CustomBreadCrumb';
import ProductWithCart from '@/components/frontend/listings/ProductWithCart';
import VerticalProduct from '@/components/frontend/listings/VerticalProduct';
import { Button } from '@/components/ui/button';
import { IProducts } from '@/type/types';
import { Products } from '@prisma/client';
import Link from 'next/link';
import React from 'react'

const page = async ({searchParams: searchParamsPromise, params: paramsPromise}: PageProps) => {

    const { type, sort } = await searchParamsPromise;
    const { slug } = await paramsPromise;

    const data = await getProductsByCategorySlug(slug, type, sort)
    const products = data?.products
    const categories = data?.categories

    const categoryName = slug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
   
    const breadCrumb = [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: categoryName,
        href: `/categories/${slug}?type=${type}`,
      }
    ]
    
    
  return (

    <div className='container'>
        <div className='py-4 border-t'>
            <div className='flex items-center justify-between'>
                <CustomBreadCrumb breadCrumb={breadCrumb} />
                <div className='text-xs text-muted-foreground'>1-40 of {products?.length} results</div>
            </div>
            <div className='flex items-center justify-between'>
              <h1 className="scroll-m-20 pt-2 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize">
                {categoryName} <span className='text-4xl'>({products?.length})</span>
              </h1>
              <div className='space-x-3 pt-2'>
                <span className='text-sm font-semibold tracking-tight'>Sort By:</span>
                <Button asChild variant={sort==="desc" ? "secondary" : "outline"}>
                  <Link href={`/categories/${slug}?type=${type}&&sort=desc`}>
                    <span className='text-primary'>Price - High to Low</span>
                  </Link>
                </Button>
                <Button asChild variant={sort==="asc" ? "secondary" : "outline"}>
                  <Link href={`/categories/${slug}?type=${type}&&sort=asc`}>
                    <span className='text-primary'>Price - Low to High</span>
                  </Link>
                </Button>
              </div>
            </div>  
        </div>

        <div className='grid grid-cols-12'>
          <div className='col-span-3 shadow-sm border p-4 rounded bg-white space-y-2'>
            <h2 className='text-lg font-bold tracking-tight'>Browse Categories</h2>
            <div className='flex flex-col border-b gap-1'>
              {categories && categories.length > 0 ? (
                categories.map((c, i) => {
                  return (
                      <Link
                      key={i} 
                      href={`/categories/${c.slug}?type=${c.type}`}
                      className='hover:text-blue-600 duration-300 transition-all'
                    >
                        {c.title}
                    </Link>
                  )
                })
              ) : (
                <p className='text-muted-foreground text-sm tracking-tight'>
                  - No more categories found. -
                </p>
              )}
            </div>
          </div>
          <div className='col-span-9'>
              {
                products && products.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {products.map((product, i) => {
                      return (
                        <div key={i} className='mb-4'>
                          <ProductWithCart
                            product={product as IProducts} 
                          />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p>No products found in this category.</p>
                )
              }
          </div>
        </div>
    </div>
  )
}

export default page