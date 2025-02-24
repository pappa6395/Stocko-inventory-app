"use server"

import { prismaClient } from "@/lib/db";
import { ILineOrder } from "@/type/types";

export async function getOrderById(id: number) {
    try {
        const order = await prismaClient.lineOrder.findUnique({
            where: {
                id,
            },
            include: {
                lineOrderItems: true,
            }
        });
        return {
            success: true,
            data: order as ILineOrder,
            error: null,
        };
    } catch (error) {
        console.error("Failed to find order by ID:", error);
        return {
            success: false,
            data: null,
            error: error,
        };
    }
}

export async function getCustomers() {
    try {
      const customerIds = await prismaClient.lineOrder.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
          customerId: true,
        },
      });
      const customers = await prismaClient.user.findMany({
        where: {
          id: {
            in: customerIds.map((i) => i.customerId),
          }
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          profileImage: true,
          createdAt: true,
        },
      })
  
      return {
        ok: true,
        data: customers,
        error: null,
      };
    } catch (error) {
      console.error("Failed to get orders:", error);
      return {
        ok: false,
        data: null,
        error: "Failed to get orders",
      };
    }
  }