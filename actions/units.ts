"use server"

import { prismaClient } from "@/lib/db";
import { UnitProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createUnit(data: UnitProps) {
    console.log("Payload checked:", data);
    
    try {
        const existingUnit = await prismaClient.unit.findUnique({
            where: {
                title: data.title
            }
        });
        const existingAbb = await prismaClient.unit.findUnique({
            where: {
                abbreviation: data.abbreviation
            }
        });
        if (existingUnit || existingAbb) {
            return existingUnit || existingAbb;
        }
        const newSupplier = await prismaClient.unit.create({
            data
        });
        revalidatePath("/dashboard/inventory/units")
        return newSupplier;

    } catch (err) {
        console.error("Failed to create unit:",err);
        return null;
    }
}

export async function getAllUnits() {
    
    try {
        const units = await prismaClient.unit.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return units;

    } catch (err) {
        console.error("Failed to get units:",err);
        return null;
    }
}

export async function getUnitById(id: string) {

    if (id) {

        try {
            const unit = await prismaClient.unit.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return unit
        } catch (err) {
            console.error("Failed to find unit by ID:",err);
            return null;
        }
    }
}

export async function updateUnitById(id: string, data: UnitProps) {

    if (id && data) {

        try {
            const updateUnit = await prismaClient.unit.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/units")
            return updateUnit
        } catch (err) {
            console.error("Failed to update unit by ID:",err);
            return null;
        }
    }
}

export async function deleteUnitById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedUnit = await prismaClient.unit.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/units")
        return {
            ok: true,
            data: deletedUnit 
        }
    } catch (err) {
        console.error("Failed to delete unit:",err);
    }
}

export async function createBulkUnits(units: UnitProps[]) {
    try {
    
        for (const unit of units) {
            await createUnit(unit)
        }
    } catch (err) {
        console.error("Failed to create bulk units:",err);
    }
}