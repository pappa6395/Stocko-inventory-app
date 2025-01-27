"use server"

import { prismaClient } from "@/lib/db";
import { BrandProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createBrand(data: BrandProps) {
    console.log("Payload checked:", data);
    
    const slug = data.slug

    try {
        const existingBrand = await prismaClient.brand.findUnique({
            where: {
                slug
            }
        });
        if (existingBrand) {
            return existingBrand
        }

        const newBrand = await prismaClient.brand.create({
            data
        });
        revalidatePath("/dashboard/inventory/brands")
        return newBrand;

    } catch (err) {
        console.error("Failed to create brand:",err);
        return null;
    }
}

export async function getAllBrands() {
    
    try {
        const brands = await prismaClient.brand.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return brands;

    } catch (err) {
        console.error("Failed to get brands:",err);
        return null;
    }
}

export async function getBrandById(id: string) {

    if (id) {

        try {
            const brand = await prismaClient.brand.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return brand
        } catch (err) {
            console.error("Failed to find brand by ID:",err);
            return null;
        }
    }
}

export async function updateBrandById(id: string, data: BrandProps) {

    if (id && data) {

        try {
            const updateCategory = await prismaClient.brand.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/brands")
            return updateCategory
        } catch (err) {
            console.error("Failed to update brand by ID:",err);
            return null;
        }
    }
}

export async function deleteBrandById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedBrand = await prismaClient.brand.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/brands")
        return {
            ok: true,
            data: deletedBrand 
        }
    } catch (err) {
        console.error("Failed to delete brand:",err);
    }
}

export async function createBulkBrands(brands: BrandProps[]) {
    try {
    
        for (const brand of brands) {
            await createBrand(brand)
        }
    } catch (err) {
        console.error("Failed to create bulk brands:",err);
    }
}