
import { PageProps } from '@/.next/types/app/(shop)/product/[slug]/page'
import { getAllProducts, getProductBySlug, getSimilarProducts } from '@/actions/products'
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
import ShareProduct from '@/components/frontend/ShareProducts'
import ProductReviewForm from '@/components/frontend/ProductReviewForm'
import { timeAgo } from '@/lib/timeAgo'
import { getApprovedProductReviews } from '@/actions/reviews'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/authOptions'

//app/products/[slug]

type Props = {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params}: Props) {
  //Fetch all the products, then find a single product
  const { slug } = await params;
  const product = await getProductBySlug(slug) || null
  return {
    title: product?.name,
    description: product?.productDetails,
    alternates: {
      canonical: `/product/${product?.slug}`,
    },
    openGraph: {
      title: product?.name,
      description: product?.productDetails,
      images: [product?.productThumbnail],
    },
  };
}
export async function generateStaticParams() {

    try {
        const products = await getAllProducts() || [];
        if (products?.length > 0) {
            return products.map((p) => ({
            slug: p.slug,
            }));
        }
        return [];
        
    } catch (err) {
        console.error("Failed to generate static params:",err);
        return [];
    }
  
}

const page = async ({params: paramsPromise}: PageProps) => {

    const { slug } = await paramsPromise

    const session = await getServerSession(authOptions);
    const products = await getProductBySlug(slug) || null
    const subCategoryId = products?.subCategoryId || 0
    const productId = products?.id || 0

    const similarProducts = await getSimilarProducts(subCategoryId, productId)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const url = `${baseUrl}/product/${slug}`

    const productReviews = await getApprovedProductReviews(products?.id ?? 0) || [];
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

    const averageRating = productReviews.reduce(
        (acc, item) => acc + item.rating, 0) / productReviews.length;

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
                            <h2 className="text-2xl font-semibold">${products?.productPrice.toLocaleString()}</h2>
                            <s>${products?.productPrice}</s>
                            <Minus className='text-sm text-gray-400' />
                            <span>Stock: {products?.stockQty} Left</span>
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
                            <ShareProduct productUrl={url} />
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
            <Tabs defaultValue="content" className="w-full">
                <TabsList>
                    <TabsTrigger value="content">Product Details</TabsTrigger>
                    <TabsTrigger value="description">Product Description</TabsTrigger>
                    <TabsTrigger value="reviews">Product Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="content">
                    <ProductContent codeString={products?.content || ""} />
                </TabsContent>
                <TabsContent value="description">
                    {products?.productDetails}
                </TabsContent>
                <TabsContent value="reviews">
                    {productReviews && productReviews.length > 0 ? (
                    <div className="px-8 max-w-4xl ">
                        <h2>Reviews</h2>
                        <div className="py-3">
                        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {averageRating.toFixed(1)}
                        </h2>
                        </div>
                        <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <svg
                            key={i}
                            className={`w-6 h-6 ${
                                i < averageRating ? "text-yellow-500" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.854 1.417 8.148L12 18.896l-7.417 4.53L6 15.277 0 9.423l8.332-1.268L12 .587z" />
                            </svg>
                        ))}
                        </div>
                        <p>based on {productReviews.length} reviews</p>

                        <div className="py-6 space-y-6">
                        {productReviews.map((item) => {
                            return (
                            <div key={item.id} className="">
                                <div className="flex pb-3 justify-between">
                                <div className="flex items-center space-x-3">
                                    <Image
                                    src={item.image ?? "/placeholder.svg"}
                                    alt={item.name ?? ""}
                                    className="w-12 h-12 rounded-lg"
                                    width={200}
                                    height={200}
                                    />
                                    <div className="">
                                    <h2>{item.name}</h2>
                                    <div className="flex items-end space-x-2">
                                        <div className="flex">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <svg
                                            key={i}
                                            className={`w-5 h-5 text-yellow-500`}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            >
                                            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.854 1.417 8.148L12 18.896l-7.417 4.53L6 15.277 0 9.423l8.332-1.268L12 .587z" />
                                            </svg>
                                        ))}
                                        </div>
                                        <p>{item.rating.toFixed(1)}</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p>{timeAgo(item.createdAt)}</p>
                                </div>
                                </div>
                                <p>{item.comment}</p>
                            </div>
                            );
                        })}
                        </div>
                        <div className="py-6">
                        <ProductReviewForm
                            productId={products?.id ?? 0}
                            session={session}
                            returnUrl={`/product/${slug}`}
                        />
                        </div>
                    </div>
                    ) : (
                    <div className="">
                        <h2>No Product Reviews</h2>
                        <div className="py-6">
                        <ProductReviewForm
                            productId={products?.id ?? 0}
                            session={session}
                            returnUrl={`/product/${slug}`}
                        />
                        </div>
                    </div>
                    )}
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