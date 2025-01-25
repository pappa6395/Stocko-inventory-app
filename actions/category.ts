"use server"

import { prismaClient } from "@/lib/db";
import { CategoryProps, ExcelCategoryProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createCategory(data: CategoryProps) {
    console.log("Payload checked:", data);
    
    try {
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
        const categories = await prismaClient.category.findMany();

        return categories;

    } catch (err) {
        console.error("Failed to create category:",err);
        return null;
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