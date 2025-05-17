"use client"

import React, { useEffect, useState } from "react";
import CustomCodeBlock from "./CustomCodeBlock";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/actions/products";
import { getOrdersCount } from "@/actions/analytics";

export default function OrderEndpoints() {

  const allProductsCodeString = `
  {
    "success":true,
    "error":null
    "data":[
    {
        "id": 170,
        "customerId": 4,
        "customerName": "Walk in Customer",
        "createdAt": "2025-02-25T07:21:55.709Z",
        "updatedAt": "2025-02-25T13:35:24.368Z",
        "orderNumber": "2L0LZIT6",
        "status": "DELIVERED",
        "customerEmail": "sejyvi@mailinator.com",
        "orderAmount": 80,
        "orderType": "Sale",
        "source": "pos",
        "firstName": null,
        "lastName": null,
        "email": null,
        "phone": "+1 (979) 309-2428",
        "streetAddress": null,
        "city": null,
        "state": null,
        "zipCode": null,
        "country": null,
        "unitNumber": null,
        "paymentMethod": null,
        "lineOrderItems": [
        {
            "id": 139,
            "productId": 4,
            "orderId": 170,
            "name": "Nike Dunk Low Retro",
            "price": 80,
            "qty": 1,
            "productThumbnail": "https://res.cloudinary.com/duwdwnu8y/image/upload/v1739410101/stocko/irrub6j7tyasbtrj94hw.webp",
            "createdAt": "2025-02-25T07:21:56.494Z",
            "updatedAt": "2025-02-25T07:21:56.494Z",
            "product": {
                "id": 4,
                "name": "Dunk Low Retro",
                "slug": "dunk-low-retro",
                "productCode": 270814194,
                "stockQty": 45,
                "codeSymbology": "CODE128",
                "saleUnit": 5,
                "productCost": 40,
                "productPrice": 80,
                "productTax": 7,
                "taxMethod": "inclusive",
                "productImages": [
                "https://res.cloudinary.com/duwdwnu8y/image/upload/v1739410101/stocko/irrub6j7tyasbtrj94hw.webp"
                ],
                "productThumbnail": "https://res.cloudinary.com/duwdwnu8y/image/upload/v1739410101/stocko/irrub6j7tyasbtrj94hw.webp",
                "barcodeImageUrl": "",
                "productDetails": "Classic low-top design with a leather upper, offering a timeless look and comfortable fit.",
                "content": null,
                "batchNumber": "4",
                "expiryDate": "2025-04-30T00:00:00.000Z",
                "isFeatured": true,
                "status": true,
                "alertQuantity": 10,
                "unitId": 3,
                "subCategoryId": 50,
                "brandId": 11,
                "supplierId": 1,
                "createdAt": "2025-02-13T01:29:30.380Z",
                "updatedAt": "2025-02-25T07:21:56.100Z"
            }
        }]
    },
    //
    ],
    
  }
  `;
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

  const [count, setCount] = useState(0)
  
    useEffect(() => {
        const productCounts = async () => {
            const countNum = await getOrdersCount()
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
          Get all Orders
        </h2>
        <p className="py-3">
          You can access the list of {count} orders by using the /orders
          endpoint.
        </p>
        <Button variant={"outline"}>
          <h3 className="scroll-m-20 pt-2 text-sm uppercase tracking-widest">
            Request [GET]
          </h3>
        </Button>
        <div className="py-4">
          <CustomCodeBlock
            showLineNumbers={false}
            codeString={`${baseUrl}/orders`}
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
    </div>
  );
}
