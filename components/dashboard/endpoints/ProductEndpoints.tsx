"use client"

import React from "react";
import CustomizeCodeBlock from "@/components/dashboard/endpoints/CustomCodeBlock";


export default function ProductEndpoints() {
  const codeString = `
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
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

  return (
    <div className="py-6">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Get all products
      </h2>
      <p className="py-3">
        You can access the list of 200 products by using the /products endpoint.
      </p>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Request
      </h3>
      <div className="py-4">
        <CustomizeCodeBlock
          showLineNumbers={false}
          codeString={`[GET] ${baseUrl}/products`}
          language="jsx"
        />
      </div>
      <div className="py-4">
        <h2 className="py-3">Response</h2>
        <CustomizeCodeBlock
          showLineNumbers={true}
          codeString={codeString}
          language="jsx"
        />
      </div>
    </div>
  );
}
