"use server"

import { prismaClient } from "@/lib/db";
import { SupplierProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createSupplier(data: SupplierProps) {
    console.log("Payload checked:", data);
    
    const slug = data.slug

    try {
        const existingSupplier = await prismaClient.supplier.findUnique({
            where: {
                slug
            }
        });
        if (existingSupplier) {
            return existingSupplier
        }

        const newSupplier = await prismaClient.supplier.create({
            data
        });
        revalidatePath("/dashboard/inventory/suppliers")
        return newSupplier;

    } catch (err) {
        console.error("Failed to create supplier:",err);
        return null;
    }
}

export async function getAllSuppliers() {
    
    try {
        const suppliers = await prismaClient.supplier.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return suppliers;

    } catch (err) {
        console.error("Failed to get suppliers:",err);
        return null;
    }
}

export async function getSupplierById(id: string) {

    if (id) {

        try {
            const supplier = await prismaClient.supplier.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return supplier
        } catch (err) {
            console.error("Failed to find supplier by ID:",err);
            return null;
        }
    }
}

export async function updateSupplierById(id: string, data: SupplierProps) {

    if (id && data) {

        try {
            const updateSupplier = await prismaClient.supplier.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/suppliers")
            return updateSupplier
        } catch (err) {
            console.error("Failed to update supplier by ID:",err);
            return null;
        }
    }
}

export async function deleteSupplierById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedSupplier = await prismaClient.supplier.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/suppliers")
        return {
            ok: true,
            data: deletedSupplier 
        }
    } catch (err) {
        console.error("Failed to delete supplier:",err);
    }
}

export async function createBulkSuppliers(suppliers: SupplierProps[]) {
    try {
    
        for (const supplier of suppliers) {
            await createSupplier(supplier)
        }
    } catch (err) {
        console.error("Failed to create bulk suppliers:",err);
    }
}