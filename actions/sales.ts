"use server"

import { prismaClient } from "@/lib/db";

export async function getAllSales() {

    try {
        const sales = await prismaClient.sale.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return {
            ok: true,
            data: sales,
            error: null,
        }

    } catch (err) {
        console.error("Failed to get sales:",err);
        return {
            ok: false,
            data: null,
            error: "Failed to get sales",
        }
    }
}