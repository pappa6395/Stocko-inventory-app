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

    <div className='grid grid-cols-1 sm:grid-cols-12 gap-2'>
        <div className="relative sm:col-span-8 col-span-full">
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
                        className='w-full object-cover cursor-pointer rounded-md'
                    />
                )
            })}    
        </Carousel>
        </div>
        <div className="sm:col-span-4">
            <div className="grid grid-cols-2 gap-2">
            {[activeAdverts[3],activeAdverts[2],activeAdverts[0],activeAdverts[1]].map((advert,i) => {
                return (
                    <Image
                        src={advert.imageUrl || "/placeholder.svg"}
                        alt={advert.title}
                        key={i}
                        width={250}
                        height={200} 
                        onClick={() => router.push(advert.link)}
                        className='w-full sm:h-32 md:h-44 cursor-pointer rounded-md'
                    />
                )
            })}    
            </div>
        </div>
        
    </div>

  )
}

export default Hero