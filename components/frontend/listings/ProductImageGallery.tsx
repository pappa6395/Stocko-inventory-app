"use client"

import dynamic from 'next/dynamic';
import React from 'react';

// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
const ImageGallery = dynamic(() => import("react-image-gallery"), { ssr: false });

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];

type ProductImageGalleryProps = {
    images: Array<{ original: string, thumbnail: string }>;
}

const ProductImageGallery = ({images}: ProductImageGalleryProps ) => {

  return (

    <div>
        <ImageGallery items={images} />
    </div>

  )
}

export default ProductImageGallery