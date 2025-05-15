import { PageProps } from '@/.next/types/app/(shop)/page';
import { getProductsByCategorySlug } from '@/actions/products';
import CustomBreadCrumb from '@/components/frontend/CustomBreadCrumb';
import ProductWithCart from '@/components/frontend/listings/ProductWithCart';
import Paginate from '@/components/frontend/Paginate';
import PriceRange from '@/components/frontend/PriceRange';
import { Button } from '@/components/ui/button';
import { IProducts } from '@/type/types';
import Link from 'next/link';
import React from 'react';

type Props = {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({params}: Props) {
  //Fetch all the products, then find a single product
  const { slug } = await params;
  const categoryName = slug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return {
    title: categoryName,
    alternates: {
      canonical: `/categories/${slug}`,
    },
  };
}

const page = async ({searchParams: searchParamsPromise, params: paramsPromise}: PageProps) => {

    const { type, sort, min, max, page=1 } = await searchParamsPromise;
    const { slug } = await paramsPromise;
    const pageSize = 6;

    const data = await getProductsByCategorySlug(
      slug, 
      type,
      page,
      pageSize, 
      sort,
      min,
      max,
    )
    const products = data?.products
    const categories = data?.categories
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / pageSize)
    const startRange = (Number(page) - 1) * pageSize + 1;
    const endRange = Math.min(startRange + pageSize - 1, totalCount);

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
                <div className='text-xs text-muted-foreground'>{startRange}-{endRange} of {totalCount} results</div>
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
          <div className='col-span-3 shadow-md border p-4 rounded bg-white dark:bg-slate-800 space-y-2'>
            <h2 className='text-lg font-bold tracking-tight'>Browse Categories</h2>
            <div className='flex flex-col border-b gap-1 py-2'>
              {categories && categories.length > 0 ? (
                categories.map((c, i) => {
                  return (
                      <Link
                      key={i} 
                      href={`/categories/${c.slug}?type=${c.type}`}
                      className='hover:text-blue-600 duration-300 transition-all'
                    >
                        <span className='text-sm/6'>{c.title}</span>
                    </Link>
                  )
                })
              ) : (
                <p className='text-muted-foreground text-sm tracking-tight'>
                  - No more categories found. -
                </p>
              )}
            </div>
            <div>
              <PriceRange />
            </div>
          </div>
          <div className='col-span-9'>
              {
                products && products.length > 0 ? (
                  <>
                   <div className='px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
                    <Paginate totalPages={totalPages} />
                  </>
                ) : (
                  <div className='px-4'>
                      <p>No products found in this category.</p>
                  </div>
                  
                )
              }
          </div>
        </div>
    </div>
  )
}

export default page