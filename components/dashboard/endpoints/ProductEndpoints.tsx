"use client"

import React, { useEffect, useState } from "react";
import CustomCodeBlock from "./CustomCodeBlock";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/actions/products";
import { getProductsCount } from "@/actions/analytics";

export default function ProductEndpoints() {
  
    const allProductsCodeString = `
    {
        "success":true,
        "error":null
        "data":[
        {
        "id": "667ce87f0c413652ea95cd31",
        "name": "5ft Office Table With 3ft Extension",
        "slug": "5ft-office-table-with-3ft-extension",
        "productCode": "147642834",
        "stockQty": 98,
        "productCost": 100,
        "productPrice": 200,
        "alertQty": 10,
        "productTax": 5,
        "taxMethod": "inclusive",
        "productImages": [
            "https://utfs.io/f/ea7f2510-97a3-4eee-b4ff-f64dad0a9e4a-p0mwdf.jpg",
            "https://utfs.io/f/77deeb48-ceb8-4702-b9ad-b2b03881aaec-n83ahj.jpg"
        ],
        "status": true,
        "productThumbnail": "https://utfs.io/f/ea7f2510-97a3-4eee-b4ff-f64dad0a9e4a-p0mwdf.jpg",
        "productDetails": " 5 feet desk and 3 feet extension suitable for middle managers/Supervisors",
        "content": "<h3>Product Details</h3><p>This is the best table i have ever used , it really nice</p><ul class=\"novel-list-disc novel-list-outside novel-leading-3 novel--mt-2 tight\" data-tight=\"true\"><li class=\"novel-leading-normal novel--mb-2\"><p>Portable</p></li><li class=\"novel-leading-normal novel--mb-2\"><p>Cost effective</p></li><li class=\"novel-leading-normal novel--mb-2\"><p>Versatile and durable</p></li></ul>",
        "batchNumber": "929",
        "expiryDate": "2024-06-27T00:00:00.000Z",
        "isFeatured": true,
        "createdAt": "2024-06-27T04:20:15.669Z",
        "updatedAt": "2024-07-08T04:22:33.235Z",
        "subCategoryId": "6670057f9c0ce14ce01842df",
        "brandId": "66457757076904eae2e8ffa0",
        "unitId": "6646e2e392c89096283cb593",
        "supplierId": "6646d95d92c89096283cb58b",
        "subCategory": {
            "id": "6670057f9c0ce14ce01842df",
            "title": "Office and Business ",
            "slug": "office-and-business-",
            "categoryId": "66700548a6eeb3b691452f6d",
            "createdAt": "2024-06-17T09:44:31.786Z",
            "updatedAt": "2024-06-17T09:44:31.786Z"
        }
        },
        //
        ],
        
    }
    `;
    const singleProductCodeString = `
    {
        "data": {
            "id": 39,
            "name": "iPhone 15 Pro - Black Titnium",
            "slug": "iphone-15-pro---black-titnium",
            "productCode": 692763305,
            "stockQty": 50,
            "codeSymbology": "CODE128",
            "saleUnit": 0,
            "productCost": 1000,
            "productPrice": 1400,
            "productTax": 7,
            "taxMethod": "inclusive",
            "productImages": [
            "https://res.cloudinary.com/duwdwnu8y/image/upload/v1740554373/stocko/zgo5cginfozqq8ju6hve.jpg"
            ],
            "productThumbnail": "https://res.cloudinary.com/duwdwnu8y/image/upload/v1740554373/stocko/zgo5cginfozqq8ju6hve.jpg",
            "barcodeImageUrl": "https://res.cloudinary.com/duwdwnu8y/image/upload/v1740554741/stocko/hc70kfbnausrm4gazuo5.png",
            "content": null,
            "batchNumber": "39",
            "expiryDate": "2025-06-01T00:00:00.000Z",
            "isFeatured": true,
            "status": true,
            "alertQuantity": 10,
            "unitId": 1,
            "subCategoryId": 102,
            "brandId": 1,
            "supplierId": 1,
            "createdAt": "2025-02-26T07:33:57.535Z",
            "updatedAt": "2025-02-26T07:33:57.535Z",
            "brand": {
            "id": 1,
            "title": "Apple",
            "slug": "apple",
            "status": true,
            "imageUrl": "https://res.cloudinary.com/duwdwnu8y/image/upload/v1739248869/stocko/rm447yv1f1387ntafal8.jpg",
            "createdAt": "2025-02-11T04:41:24.375Z",
            "updatedAt": "2025-02-11T04:41:24.375Z"
            },
            "subCategory": {
                "id": 102,
                "title": "iPhone",
                "slug": "iphone",
                "categoryId": 25,
                "createdAt": "2025-02-26T07:09:22.283Z",
                "updatedAt": "2025-02-26T07:09:22.283Z",
                "category": {
                    "id": 25,
                    "title": "Smartphones",
                    "description": "Smartphones are essential for communication, work, and entertainment. Equipped with powerful processors, high-resolution cameras, and advanced software, they enhance productivity and social connectivity. From budget-friendly to flagship models, smartphones cater to different needs, offering seamless browsing, gaming, and app usage, making them indispensable in modern life.",
                    "imageUrl": "https://res.cloudinary.com/duwdwnu8y/image/upload/v1739366915/stocko/kxzqwseakqxgapsp41ic.avif",
                    "status": true,
                    "slug": "smartphones",
                    "mainCategoryId": 2,
                    "createdAt": "2025-02-12T13:28:48.686Z",
                    "updatedAt": "2025-02-12T13:28:48.686Z",
                    "mainCategory": {
                    "id": 2,
                    "title": "Phone and Tablets",
                    "slug": "phone-and-tablets",
                    "createdAt": "2025-02-11T02:51:46.243Z",
                    "updatedAt": "2025-02-11T02:51:46.243Z"
                }
            }
        }
    },
    "success": true,
    "error": null
    }
    `;
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

    const [count, setCount] = useState(0)

    useEffect(() => {
        const productCounts = async () => {
            const countNum = await getProductsCount()
            if (countNum) {
                setCount(countNum)
            }
        }
        productCounts()
    },[])

  return (
    <div className="space-y-8">
      <div className="py-6">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Get all products
        </h2>
        <p className="py-3">
          You can access the list of {count} products by using the
          /products endpoint.
        </p>
        <Button variant={"outline"}>
          <h3 className="scroll-m-20 pt-2 text-sm uppercase tracking-widest">
            Request [GET]
          </h3>
        </Button>
        <div className="py-4">
          <CustomCodeBlock
            showLineNumbers={false}
            codeString={`${baseUrl}/products`}
            language="jsx"
          />
        </div>
        <div className="py-3">
          <div className="pb-3">
            <Button variant={"outline"}>
              <h3 className="scroll-m-20 pt-2 text-sm uppercase tracking-widest">
                Response [JSON]
              </h3>
            </Button>
          </div>
          <CustomCodeBlock
            showLineNumbers={true}
            codeString={allProductsCodeString}
            language="jsx"
          />
        </div>
      </div>
      <div className="py-6">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Get a Single Product
        </h2>
        <p className="py-3">
          You can get a single product by adding the slug as a parameter:
          /products/slug
        </p>
        <Button variant={"outline"}>
          <h3 className="scroll-m-20 pt-2 text-sm uppercase tracking-widest">
            Request [GET]
          </h3>
        </Button>
        <div className="py-4">
          <CustomCodeBlock
            showLineNumbers={false}
            codeString={`${baseUrl}/products/iphone-15-pro---black-titnium`}
            language="jsx"
          />
        </div>
        <div className="py-3">
          <div className="pb-3">
            <Button variant={"outline"}>
              <h3 className="scroll-m-20 pt-2 text-sm uppercase tracking-widest">
                Response [JSON]
              </h3>
            </Button>
          </div>
          <CustomCodeBlock
            showLineNumbers={true}
            codeString={singleProductCodeString}
            language="jsx"
          />
        </div>
      </div>
    </div>
  );
}
