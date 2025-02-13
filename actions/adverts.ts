"use server"

import { prismaClient } from "@/lib/db";
import { AdvertProps } from "@/type/types";
import { revalidatePath } from "next/cache";

export async function createAdvert(data: AdvertProps) {
    console.log("Payload checked:", data);
    
    try {

        const newAdvert = await prismaClient.advert.create({
            data
        });
        revalidatePath("/dashboard/inventory/Adverts")
        return newAdvert;

    } catch (err) {
        console.error("Failed to create advert:",err);
        return null;
    }
}

export async function createBulkAdverts(adverts: AdvertProps[]) {
    try {
    
        for (const advert of adverts) {
            await createAdvert(advert)
        }
    } catch (err) {
        console.error("Failed to create bulk adverts:",err);
    }
}

export async function getAllAdverts() {
    
    try {
        const adverts = await prismaClient.advert.findMany({
            orderBy: {
                title: "asc",

            },
        });

        return adverts;

    } catch (err) {
        console.error("Failed to create advert:",err);
        return null;
    }
}

export async function getAdvertById(id: string) {

    if (id) {

        try {
            const advert = await prismaClient.advert.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return advert
        } catch (err) {
            console.error("Failed to find advert by ID:",err);
            return null;
        }
    }
}

export async function updateAdvertById(id: string, data: AdvertProps) {

    if (id && data) {

        try {
            const updateAdvert = await prismaClient.advert.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/adverts")
            return updateAdvert
        } catch (err) {
            console.error("Failed to update advert by ID:",err);
            return null;
        }
    }
}

export async function deleteAdvertById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedAdvert = await prismaClient.advert.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/adverts")
        return {
            ok: true,
            data: deletedAdvert
        }
    } catch (err) {
        console.error("Failed to delete advert:",err);
    }
}