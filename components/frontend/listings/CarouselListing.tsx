"use client";
import { IProducts } from "@/type/types";
import { BaggageClaim } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselProduct from "./CarouselProduct";
import ProductWithCart from "./ProductWithCart";
import HorizontalProduct from "./HorizontalProduct";
import VerticalProduct from "./VerticalProduct";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CategoryCarousel({ 
    products, 
    cardType 
}: {
    products: IProducts[];
    cardType?: "horizontal" | "vertical" | "cart" | "carousel";
}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/40 p-2 rounded-full shadow"
  >
    <FaChevronLeft className="size-6" />
  </button>
);

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/40 p-2 rounded-full shadow"
  >
    <FaChevronRight className="size-6" />
  </button>
);

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}

      // deviceType={}
      dotListClass="custom-dot-list-style"
      itemClass="px-2 sm:px-4"
      
    >
      {products.map((product, i) => {
        return (
            cardType === "carousel" ? (
                <CarouselProduct product={product} key={i} />
            ) : cardType === "cart" ? (
                <ProductWithCart product={product} key={i} />
            ) : cardType === "horizontal" ? (
                <HorizontalProduct product={product} key={i} />
            ) : (
                <VerticalProduct product={product} key={i} />
            )
        )
      })}
    </Carousel>
  );
}