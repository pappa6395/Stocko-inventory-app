"use server"

import { prismaClient } from "@/lib/db";
import { BannerProps } from "@/type/types";
import { revalidatePath } from "next/cache";

export async function createBanner(data: BannerProps) {
    console.log("Payload checked:", data);
    
    try {

        const newBanner = await prismaClient.banner.create({
            data
        });
        revalidatePath("/dashboard/inventory/banners")
        return newBanner;

    } catch (err) {
        console.error("Failed to create banner:",err);
        return null;
    }
}

export async function createBulkBanners(banners: BannerProps[]) {
    try {
    
        for (const banner of banners) {
            await createBanner(banner)
        }
    } catch (err) {
        console.error("Failed to create bulk banners:",err);
    }
}

export async function getAllBanners() {
    
    try {
        const banners = await prismaClient.banner.findMany({
            orderBy: {
                title: "asc",

            },
        });

        return banners;

    } catch (err) {
        console.error("Failed to create banner:",err);
        return null;
    }
}

export async function getBannerById(id: string) {

    if (id) {

        try {
            const banner = await prismaClient.banner.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return banner
        } catch (err) {
            console.error("Failed to find banner by ID:",err);
            return null;
        }
    }
}

export async function updateBannerById(id: string, data: BannerProps) {

    if (id && data) {

        try {
            const updateBanner = await prismaClient.banner.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/banners")
            return updateBanner
        } catch (err) {
            console.error("Failed to update banner by ID:",err);
            return null;
        }
    }
}

export async function deleteBannerById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedBanner = await prismaClient.banner.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/banners")
        return {
            ok: true,
            data: deletedBanner
        }
    } catch (err) {
        console.error("Failed to delete banner:",err);
    }
}