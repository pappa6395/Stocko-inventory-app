"use client"

import React, { useEffect } from 'react'
import { Carousel } from "nuka-carousel";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AdvertProps, BannerProps } from '@/type/types';
import { useRouter } from 'next/navigation';

type HeroProps = {
    banners: BannerProps[]
    adverts: AdvertProps[]
}

const Hero = ({banners, adverts}: HeroProps) => {
    
    const router = useRouter();

    const activeBanners = banners.filter(b => b.status === true).map((item) => {
        return {
            title: item.title,
            imageUrl: item.imageUrl,
            link: item.bannerLink
        }
    });
    const activeAdverts = adverts.filter(a => a.status === true).map((item) => {
        return {
            title: item.title,
            imageUrl: item.imageUrl,
            link: item.advertLink
        }
    })

    
   
  return (

    <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2'>
        <div className="relative col-span-full sm:col-span-4 md:col-span-5 lg:col-span-9">
        <Carousel
            autoplay
            wrapMode='wrap'
        > 
            {activeBanners.map((banner,i) => {
                return (
                    <Image
                        src={banner.imageUrl || "/placeholder.svg"}
                        alt={banner.title}
                        key={i}
                        width={800}
                        height={500} 
                        onClick={() => router.push(banner.link)}
                        className='w-full h-[340px] object-cover md:object-contain cursor-pointer rounded-md'
                    />
                )
            })}    
        </Carousel>
        </div>
        <div className="col-span-full md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 gap-2">
            {[activeAdverts[3],activeAdverts[2],activeAdverts[0],activeAdverts[1]].map((advert,i) => {
                return (
                    <Image
                        src={advert.imageUrl || "/placeholder.svg"}
                        alt={advert.title}
                        key={i}
                        width={200}
                        height={200} 
                        onClick={() => router.push(advert.link)}
                        className='w-full object-cover cursor-pointer rounded-md'
                    />
                )
            })}    
            </div>
        </div>
        
    </div>

  )
}

export default Hero