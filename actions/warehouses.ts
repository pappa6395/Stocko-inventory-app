"use server"

import { prismaClient } from "@/lib/db";
import { BrandProps, WarehouseProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createWarehouse(data: WarehouseProps) {
    console.log("Payload checked:", data);
    
    const slug = data.slug

    try {
        const existingWarehouse = await prismaClient.warehouse.findUnique({
            where: {
                slug
            }
        });
        if (existingWarehouse) {
            return existingWarehouse;
        }

        const newWarehouse = await prismaClient.warehouse.create({
            data
        });
        revalidatePath("/dashboard/inventory/warehouses")
        return newWarehouse;

    } catch (err) {
        console.error("Failed to create warehouse:",err);
        return null;
    }
}

export async function getAllWarehouses() {
    
    try {
        const warehouses = await prismaClient.warehouse.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return warehouses;

    } catch (err) {
        console.error("Failed to get warehouses:",err);
        return null;
    }
}

export async function getWarehouseById(id: string) {

    if (id) {

        try {
            const warehouse = await prismaClient.warehouse.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return warehouse
        } catch (err) {
            console.error("Failed to find warehouse by ID:",err);
            return null;
        }
    }
}

export async function updateWarehouseById(id: string, data: WarehouseProps) {

    if (id && data) {

        try {
            const updateWarehouse = await prismaClient.warehouse.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/warehouses")
            return updateWarehouse
        } catch (err) {
            console.error("Failed to update warehouse by ID:",err);
            return null;
        }
    }
}

export async function deleteWarehouseById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedWarehouse = await prismaClient.warehouse.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/warehouses")
        return {
            ok: true,
            data: deletedWarehouse 
        }
    } catch (err) {
        console.error("Failed to delete warehouse:",err);
    }
}

export async function createBulkWarehouses(warehouses: WarehouseProps[]) {
    try {
    
        for (const warehouse of warehouses) {
            await createWarehouse(warehouse)
        }
    } catch (err) {
        console.error("Failed to create bulk warehouses:",err);
    }
}