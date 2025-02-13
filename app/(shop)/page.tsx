
import { getAllAdverts } from '@/actions/adverts'
import { getAllBanners } from '@/actions/banners'
import { getAllProducts } from '@/actions/products'
import CategoryList from '@/components/frontend/CategoryList'
import Hero from '@/components/frontend/Hero'
import ProductListing from '@/components/frontend/listings/ProductListing'
import React from 'react'

const Home = async () => {

  const banners = await getAllBanners() || []
  const adverts = await getAllAdverts() || []
  const products = await getAllProducts() || []

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
          />
          <ProductListing 
            title="Sponsored Products" 
            detailLink={"#"} 
            products={products.slice(7,17)}
            cardType='vertical'
            scrollable
          />
          <ProductListing 
            title="Flash Sales" 
            detailLink={"#"} 
            products={products.slice(12,20)}
            cardType='carousel'
            carousel
          />
          <ProductListing 
            title="Products" 
            detailLink={"#"} 
            products={products.slice(21,33)}
            cardType='cart'
          />
        </div>
      </div>
    </main>

  )
}

export default Home