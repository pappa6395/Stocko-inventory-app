
import { PageProps } from '@/.next/types/app/(shop)/product/[slug]/page'
import { getProductBySlug, getSimilarProducts } from '@/actions/products'
import CustomBreadCrumb from '@/components/frontend/CustomBreadCrumb'
import AddToCartButton from '@/components/frontend/listings/AddToCartButton'
import ProductImageGallery from '@/components/frontend/listings/ProductImageGallery'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Minus, Plus, RefreshCw, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { FaCopy, FaFacebook } from 'react-icons/fa'
import { FaLine, FaXTwitter } from 'react-icons/fa6'
import ProductListing from '@/components/frontend/listings/ProductListing'
import ProductContent from '@/components/frontend/ProductContent'


const page = async ({params: paramsPromise}: PageProps) => {

    const { slug } = await paramsPromise

    const products = await getProductBySlug(slug) || null
    const subCategoryId = products?.subCategoryId || 0
    const productId = products?.id || 0

    const similarProducts = await getSimilarProducts(subCategoryId, productId)

    const breadCrumb = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: `${products?.subCategory?.category?.mainCategory?.title}`,
            href: `/category/${products?.subCategory?.category?.mainCategory?.slug}`,
        },
        {
            label: `${products?.subCategory?.category?.title}`,
            href: `/category/${products?.subCategory?.category?.slug}`,
        },
        {
            label: `${products?.subCategory.title}`,
            href: `/category/${products?.subCategory.slug}`,
        },
        {
            label: `${products?.name}`,
            href: `/category/${products?.slug}`,
        },
    ];
    const images = products?.productImages.map((image) => {
        return {
            original: image,
            thumbnail: image,
        }
    }) || [{
        original: "/placeholder.svg",
        thumbnail: "/placeholder.svg",
    }]

  return (

    <div className='container max-w-6xl mx-auto'>
        <div className='space-y-3'>
            <CustomBreadCrumb breadCrumb={breadCrumb} />
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {products?.brand.title} {products?.name}
            </h2>
        </div>
        <div className='mt-4'>
            <div className='grid grid-cols-12 gap-2'>
                {/* Product */}
                <div className='col-span-full md:col-span-9 grid grid-cols-2
                gap-6'>
                    <div>
                        <ProductImageGallery images={images} />
                    </div>
                    <div className=''>
                        <div className='border-b pb-3'>
                            <h2 className="text-2xl font-bold">{products?.brand.title} {products?.name}</h2>
                            <p className='text-muted-foreground'>
                                Product Code: {products?.productCode}
                            </p>
                            <p className='text-muted-foreground'>
                                Brand: {products?.brand.title}
                            </p>
                        </div>
                        <div className='border-b flex items-center space-x-2'>
                            <h2 className="text-2xl font-semibold">${products?.productPrice}</h2>
                            <s>${products?.productCost}</s>
                        </div>
                        <div>
                            <AddToCartButton product={products} />
                        </div>
                        <div className='mt-3 flex items-center justify-evenly gap-3'>
                            <Badge variant={"outline"}>
                                <Link href={"#"} className='flex flex-col items-start py-2'>
                                    <span className='text-rose-500'>Call us for Bulk Purchases:</span>{" "}
                                    <span className="font-semibold">+1 (555) 555-5555</span>
                                </Link>
                            </Badge>
                            <div className='space-y-1'>
                                <h2>Share with friends</h2>
                                <div className='flex items-center gap-2'>
                                    <Link href="#">
                                        <FaXTwitter className='size-6'/>
                                    </Link>
                                    <Link href="#">
                                        <FaFacebook className='size-6 text-blue-500'/>
                                    </Link>
                                    <Link href="#">
                                        <FaLine className='size-6 text-green-500'/>
                                    </Link>
                                    <Link href="#">
                                        <FaCopy className='size-6 text-slate-500'/>
                                    </Link>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                {/* Policy */}
                <div className='col-span-full md:col-span-3 gap-6'>
                    <div className="rounded shadow p-4">
                        <h2 className="pb-2 border-b font-bold text-xl">
                            Delivery and Returns
                        </h2>
                        <div className="pt-2 space-y-3">
                            <div className="flex space-x-2">
                            <Truck className="w-6 h-6 flex-shrink-0" />
                            <div className=" space-y-1">
                                <h2 className="font-semibold">Delivery</h2>
                                <div className="text-xs space-y-2">
                                <p>Estimated delivery time 1-9 business days</p>
                                <p>Express Delivery Available</p>

                                <p>
                                    For Same-Day-Delivery: Please place your order before
                                    11AM
                                </p>

                                <p>
                                    Next-Day-Delivery: Orders placed after 11AM will be
                                    delievered the next day
                                </p>

                                <p>Note: Availability may vary by location</p>
                                </div>
                            </div>
                            </div>
                            <div className="flex space-x-2">
                                <RefreshCw className="w-6 h-6 flex-shrink-0" />
                                <div className="space-y-1">
                                    <h2 className="font-semibold">Return Policy</h2>
                                    <div className="text-xs space-y-2">
                                    <h3 className="font-semibold">
                                        Guaranteed 7-Day Return Policy
                                    </h3>
                                    <p>
                                        For details about return shipping options, please visit
                                        - Stocko Return Policy
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Product Detail */}
        <div className='pt-4 border-t'>
            <Tabs defaultValue="description">
                <TabsList className="grid grid-cols-3 w-[400px]">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="review">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                    {products?.productDetails}
                </TabsContent>
                <TabsContent value="content">
                    <ProductContent codeString={products?.content ?? ""} />
                </TabsContent>
                <TabsContent value="review">
                    <div>
                        <h2>Write a Review</h2>
                        <form>
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder="Your Name" className="border-2 w-full py-2 px-3" />
                                <input type="email" placeholder="Your Email" className="border-2 w-full py-2 px-3" />
                            </div>
                            <textarea placeholder="Your Review" className="border-2 w-full py-2 px-3 h-32 resize-none" />
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder="Rating" className="border-2 w-16 py-2 px-3" />
                                <Button variant={"default"}>Submit</Button>
                            </div>
                        </form>
                    </div>
                </TabsContent>
            </Tabs>           
        </div>
        {/* Related Products */}
        <div>
            {similarProducts && similarProducts.length > 0 && (
                <div>
                    <ProductListing 
                        title="Related Products" 
                        detailLink={"#"} 
                        products={similarProducts}
                        cardType='horizontal'
                    />
                </div>
            )}
        </div>
    </div>

  )
}

export default page