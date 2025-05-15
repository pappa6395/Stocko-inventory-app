

import { PageProps } from '@/.next/types/app/(shop)/brands/[slug]/page';
import { getAllBrands } from '@/actions/brand';
import { getGroupedProductsByBrandId } from '@/actions/products';
import CustomBreadCrumb, { BreadCrumbItem } from '@/components/frontend/CustomBreadCrumb';
import ProductListing from '@/components/frontend/listings/ProductListing';
import { IProducts } from '@/type/types';
import React from 'react'

type Props = {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({params}: Props) {
  //Fetch all the products, then find a single product
  const { slug } = await params;
  const brandName = slug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return {
    title: brandName,
    alternates: {
      canonical: `/brands/${slug}`,
    },
  };
}

export async function generateStaticParams() {

    try {
        const brands = await getAllBrands() || [];
        if (brands?.length > 0) {
            return brands.map((b) => ({
            slug: b.slug,
            }));
        }
        return [];
        
    } catch (err) {
        console.error("Failed to generate static params:",err);
        return [];
    }
  
}

const page = async ({searchParams: searchParamsPromise, params: paramsPromise}: PageProps) => {

    const { id } = await searchParamsPromise;
    const { slug } = await paramsPromise;

    const groupProducts = await getGroupedProductsByBrandId(id) || [];
    
    const brandName = slug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
    const breadCrumb: BreadCrumbItem[] = [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: "Brands",
        href: `/brands`,
      },
      {
        label: brandName,
        href: `/brands/${slug}`,
      },
    ]

  return (

    <div className='container'>
      <div className='py-8 border-t'>
        <CustomBreadCrumb breadCrumb={breadCrumb} />
        <h1 className="scroll-m-20 pt-2 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize">
          {brandName} Store
        </h1>
      </div>
      {groupProducts && groupProducts.length > 0 ? (
        <div>
          {groupProducts.map((group, i) => {
            return (
              <ProductListing
                key={i}
                title={`${group.subCategory.title} (${group.products.length})`} 
                detailLink={"#"} 
                products={group.products as IProducts[]}
                cardType='horizontal'
                className='bg-gradient-to-r from-sky-500 to-white rounded-lg'
              />
            )
          })}
        </div>
      ) : (
        <div className='min-h-96 bg-slate-100 flex items-center justify-center'>
          <h1 className="text-center text-3xl font-extrabold tracking-tight">No products found.</h1>
        </div>
        
      )}
        
    </div>

  )
}

export default page