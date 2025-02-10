"use server"

import { prismaClient } from "@/lib/db";
import { SubCategoryProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createSubCategory(data: SubCategoryProps) {
    console.log("Payload checked:", data);
    
    const slug = data.slug

    try {
        const existingCategory = await prismaClient.subCategory.findUnique({
            where: {
                slug
            }
        });
        if (existingCategory) {
            return existingCategory
        }

        const newCategory = await prismaClient.subCategory.create({
            data
        });
        revalidatePath("/dashboard/inventory/subcategories")
        return newCategory;

    } catch (err) {
        console.error("Failed to create subcategory:",err);
        return null;
    }
}

export async function getAllSubCategories() {
    
    try {
        const categories = await prismaClient.subCategory.findMany({
            orderBy: {
                title: "asc",

            }
        });

        return categories;

    } catch (err) {
        console.error("Failed to create subcategory:",err);
        return null;
    }
}

export async function getSubCategoryById(id: string) {

    if (id) {

        try {
            const subCategory = await prismaClient.subCategory.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return subCategory
        } catch (err) {
            console.error("Failed to find subcategory by ID:",err);
            return null;
        }
    }
}

export async function updateSubCategoryById(id: string, data: SubCategoryProps) {

    if (id && data) {

        try {
            const updateCategory = await prismaClient.subCategory.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/subcategories")
            return updateCategory
        } catch (err) {
            console.error("Failed to update subcategory by ID:",err);
            return null;
        }
    }
}

export async function deleteSubCategoryById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedCategory = await prismaClient.subCategory.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/subcategories")
        return {
            ok: true,
            data: deletedCategory 
        }
    } catch (err) {
        console.error("Failed to delete subcategory:",err);
    }
}

export async function createBulkSubCategories(categories: SubCategoryProps[]) {
    try {
    
        for (const category of categories) {
            await createSubCategory(category)
        }
    } catch (err) {
        console.error("Failed to create bulk sub categories:",err);
    }
}