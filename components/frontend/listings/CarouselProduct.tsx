"use client";

import { IProducts } from "@/type/types";
import { BaggageClaim } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

 
export default function CarouselProduct({ product }: { product: IProducts}) {
    

  return (
    <div className="rounded-lg mr-3  bg-white dark:bg-slate-900 overflow-hidden border shadow">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={product.productThumbnail ?? "/placeholder.svg"}
          alt={product.name}
          width={556}
          height={556}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="px-4">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-center dark:text-slate-200 text-slate-800 my-2 font-semibold">
            {product.brand.title} {product.name}
          </h2>
        </Link>
        <div className="flex items-center justify-between gap-2 pb-3 dark:text-slate-200 text-slate-800">
          <p>US$ {product.productPrice}</p>
          <button
            className="flex items-center space-x-2 bg-lime-600 px-4 py-2 rounded-md text-white"
          >
            <BaggageClaim />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}