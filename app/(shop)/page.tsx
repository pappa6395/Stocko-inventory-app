
import { getAllAdverts } from '@/actions/adverts'
import { getAllBanners } from '@/actions/banners'
import { getAllBrands } from '@/actions/brand'
import { getAllProducts } from '@/actions/products'
import CategoryList from '@/components/frontend/CategoryList'
import Hero from '@/components/frontend/Hero'
import BrandList from '@/components/frontend/listings/BrandList'
import HistoryProductListing from '@/components/frontend/listings/HistoryProductListing'
import ProductListing from '@/components/frontend/listings/ProductListing'
import React from 'react'

const Home = async () => {

  const banners = await getAllBanners() || []
  const adverts = await getAllAdverts() || []
  const products = await getAllProducts() || []
  const brands = await getAllBrands() || []

  return (

    <main className='p-4'>
      <div className='sm:container'>
        <Hero banners={banners} adverts={adverts}/>
        <div className='py-3 space-y-3'>
          <CategoryList />
          <ProductListing 
            title="Today's Deals" 
            detailLink={"#"} 
            products={products.slice(0,6)} 
            cardType='horizontal'
            className='bg-gradient-to-r from-sky-500 to-white 
            dark:from-slate-700 dark:to-slate-500 rounded-lg'
          />
          <ProductListing 
            title="Sponsored Products" 
            detailLink={"#"} 
            products={products.slice(7,17)}
            cardType='vertical'
            scrollable
            className='bg-gradient-to-r from-sky-500 to-white 
            dark:from-slate-700 dark:to-slate-500 rounded-lg'
          />
          <BrandList 
            brands={brands.slice(0,12)} 
            title={"Brands"} 
            link={`/brands`}
            className='bg-gradient-to-r from-sky-500 to-white 
            dark:from-slate-700 dark:to-slate-500 rounded-lg' 
          />
          <ProductListing 
            title="Flash Sales" 
            detailLink={"#"} 
            products={products.slice(12,20)}
            cardType='carousel'
            carousel
            className='bg-gradient-to-r from-sky-500 to-white 
            dark:from-slate-700 dark:to-slate-500 rounded-lg'
          />
          <ProductListing 
            title="Products" 
            detailLink={"#"} 
            products={products.slice(21,33)}
            cardType='cart'
            className='bg-gradient-to-r from-sky-500 to-white 
            dark:from-slate-700 dark:to-slate-500 rounded-lg'
          />
          <HistoryProductListing />
        </div>
      </div>
    </main>

  )
}

export default Home