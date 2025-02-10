"use server"

import { prismaClient } from "@/lib/db";
import { CategoryProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createCategory(data: CategoryProps) {
    console.log("Payload checked:", data);
    
    const slug = data.slug

    try {
        const existingCategory = await prismaClient.category.findUnique({
            where: {
                slug
            }
        });
        if (existingCategory) {
            return existingCategory
        }

        const newCategory = await prismaClient.category.create({
            data
        });
        revalidatePath("/dashboard/inventory/categories")
        return newCategory;

    } catch (err) {
        console.error("Failed to create category:",err);
        return null;
    }
}

export async function getAllCategories() {
    
    try {
        const categories = await prismaClient.category.findMany({
            orderBy: {
                title: "asc",

            }
        });

        return categories;

    } catch (err) {
        console.error("Failed to create category:",err);
        return null;
    }
}

export async function getCategoryById(id: string) {

    if (id) {

        try {
            const category = await prismaClient.category.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return category
        } catch (err) {
            console.error("Failed to find category by ID:",err);
            return null;
        }
    }
}

export async function updateCategoryById(id: string, data: CategoryProps) {

    if (id && data) {

        try {
            const updateCategory = await prismaClient.category.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/categories")
            return updateCategory
        } catch (err) {
            console.error("Failed to update category by ID:",err);
            return null;
        }
    }
}

export async function deleteCategoryById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedCategory = await prismaClient.category.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/categories")
        return {
            ok: true,
            data: deletedCategory 
        }
    } catch (err) {
        console.error("Failed to delete category:",err);
    }
}

export async function createBulkCategories(categories: CategoryProps[]) {
    try {
    
        for (const category of categories) {
            await createCategory(category)
        }
    } catch (err) {
        console.error("Failed to create bulk categories:",err);
    }
}