"use server"

import { prismaClient } from "@/lib/db";
import { CategoryProps, MainCategoryProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createMainCategory(data: MainCategoryProps) {
    console.log("Payload checked:", data);
    
    const slug = data.slug

    try {
        const existingCategory = await prismaClient.mainCategory.findUnique({
            where: {
                slug
            }
        });
        if (existingCategory) {
            return existingCategory
        }

        const newCategory = await prismaClient.mainCategory.create({
            data
        });
        revalidatePath("/dashboard/inventory/main-categories")
        return newCategory;

    } catch (err) {
        console.error("Failed to create category:",err);
        return null;
    }
}

export async function getAllMainCategories() {
    
    try {
        const categories = await prismaClient.mainCategory.findMany({
            orderBy: {
                title: "asc",

            }
        });

        return categories;

    } catch (err) {
        console.error("Failed to create main category:",err);
        return null;
    }
}

export async function getMainCategoryById(id: string) {

    if (id) {

        try {
            const mainCategory = await prismaClient.mainCategory.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return mainCategory
        } catch (err) {
            console.error("Failed to find main category by ID:",err);
            return null;
        }
    }
}

export async function updateMainCategoryById(id: string, data: MainCategoryProps) {

    if (id && data) {

        try {
            const updateCategory = await prismaClient.mainCategory.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/main-categories")
            return updateCategory
        } catch (err) {
            console.error("Failed to update main category by ID:",err);
            return null;
        }
    }
}

export async function deleteMainCategoryById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedCategory = await prismaClient.mainCategory.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/main-categories")
        return {
            ok: true,
            data: deletedCategory 
        }
    } catch (err) {
        console.error("Failed to delete main category:",err);
    }
}

export async function createBulkMainCategories(categories: MainCategoryProps[]) {
    try {
    
        for (const category of categories) {
            await createMainCategory(category)
        }
    } catch (err) {
        console.error("Failed to create bulk main categories:",err);
    }
}