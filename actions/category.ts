"use server"

import { CategoryProps } from "@/type/types";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db"

export async function createCategory(data: CategoryProps) {
    console.log("Payload checked:", data);
    
    try {
        const newCategory = await prisma.category.create({
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
        const categories = await prisma.category.findMany();

        return categories;

    } catch (err) {
        console.error("Failed to create category:",err);
        return null;
    }
}

export async function getCategoryByCategoryId(categoryId: number) {

    try {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        });

        return category;

    } catch (err) {
        console.error("Failed to find category:",err);
        return null;
    }
}
