"use client";

import { useAppDispatch } from "@/redux/hooks/hooks";
import { addProductToHistory } from "@/redux/slices/historySlice";
import { IProducts } from "@/type/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCartButton from "./AddToCartButton";

 
export default function CarouselProduct({ product }: { product: IProducts}) {
    

  const dispatch = useAppDispatch();
  const handleAdd = () => {
      const newHistoryItem = {
          id: product?.id || 0,
          name: product?.name || "",
          slug: product?.slug || "",
          productPrice: product?.productPrice || 0,
          productDetails: product?.productDetails || "",
          productThumbnail: product?.productThumbnail || "/placeholder.svg",
          stockQty: product?.stockQty || 0,
      };
      dispatch(
          addProductToHistory(newHistoryItem)
      )
  };

  return (
    <div className="rounded-lg mr-3  bg-white dark:bg-slate-900 overflow-hidden border shadow">
      <Link 
        href={`/products/${product.slug}`}
        onClick={handleAdd}
      >
        <Image
          src={product.productThumbnail ?? "/placeholder.svg"}
          alt={product.name}
          width={556}
          height={556}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="px-4">
        <Link href={`/products/${product.slug}`} onClick={handleAdd}>
          <h2 className="text-center dark:text-slate-200 text-slate-800 my-2 font-semibold">
            {product.brand.title} {product.name}
          </h2>
        </Link>
        <div className="flex items-center justify-between gap-2 pb-3 dark:text-slate-200 text-slate-800">
          <p>US$ {product.productPrice}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}