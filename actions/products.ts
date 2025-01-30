"use server"

import { prismaClient } from "@/lib/db";
import { ProductProps, WarehouseProductProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createProduct(data: ProductProps) {
    console.log("Payload checked:", data);
    
    const slug = data.slug

    try {
        const existingProduct = await prismaClient.products.findUnique({
            where: {
                slug
            }
        });
        if (existingProduct) {
            return {
                success: false,
                data: null,
                error: "Product with this slug already exists"
            }
        }

        const newProduct = await prismaClient.products.create({
            data
        });
        revalidatePath("/dashboard/inventory/products")
        return {
            success: true,
            data: newProduct,
            error: null
        }

    } catch (err) {
        console.error("Failed to create product:",err);
        return {
            success: false,
            data: null,
            error: "Failed to create product"
        }
    }
}

// export async function createWarehouseProduct(data: WarehouseProductProps) {
//     console.log("Payload checked:", data);
    
//     try {

//         const newWarehouseProduct = await prismaClient.warehouseProduct.create({
//             data
//         });
//         revalidatePath("/dashboard/inventory/products")
//         return newWarehouseProduct;

//     } catch (err) {
//         console.error("Failed to create warehouse product:",err);
//         return null;
//     }
// }

export async function getAllProducts() {
    
    try {
        const products = await prismaClient.products.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return products;

    } catch (err) {
        console.error("Failed to get products:",err);
        return null;
    }
}

export async function getProductById(id: string) {

    if (id) {

        try {
            const product = await prismaClient.products.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return product
        } catch (err) {
            console.error("Failed to find product by ID:",err);
            return null;
        }
    }
}

export async function updateProductById(id: string, data: ProductProps) {

    if (id && data) {

        try {
            const updateProduct = await prismaClient.products.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/products")
            return updateProduct
        } catch (err) {
            console.error("Failed to update product by ID:",err);
            return null;
        }
    }
}

export async function deleteProductById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedProduct = await prismaClient.products.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/products")
        return {
            ok: true,
            data: deletedProduct
        }
    } catch (err) {
        console.error("Failed to delete product:",err);
    }
}

export async function createBulkProducts(products: ProductProps[]) {
    try {
    
        for (const product of products) {
            await createProduct(product)
        }
    } catch (err) {
        console.error("Failed to create bulk products:",err);
    }
}