"use server"

import { prismaClient } from "@/lib/db";
import { Customer, ILineOrder } from "@/type/types";
import { OrderStatus } from "@prisma/client";

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

      
      const userIds = customerIds.map((i) => i.customerId)
      const customers = await prismaClient.user.findMany({
        where: {
          id: {
            in: userIds,
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
        data: customers as Customer[],
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

export async function getOrdersByCustomerId(customerId: number) {
  try {
    const orders = await prismaClient.lineOrder.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        lineOrderItems: true,
      },
    });
    return {
      ok: true,
      data: orders as ILineOrder[],
      error: null,
    };
  } catch (error) {
    console.error("Failed to get orders by customer ID:", error);
    return {
      ok: false,
      data: null,
      error: "Failed to get orders by customer ID",
    };
  }
}

export async function getOrdersByOrderPagination(
  customerId: number, 
  pageNumber: number, 
  pageSize: number
) 
  {
    try {
      const orders = await prismaClient.lineOrder.findMany({
        where: {
          customerId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          lineOrderItems: true,
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      const totalCount = await prismaClient.lineOrder.count({
        where: {
          customerId,
        },
      });
      return {
        status: 200,
        data: {
          orders: orders as ILineOrder[],
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
        error: null,
      };
    } catch (error) {
      console.error("Failed to get orders by customer ID:", error);
      return {
        status: 500,
        data: null,
        error: "Failed to get orders by customer ID",
      };
    }
}

export async function changeOrderStatusById(id: number, updateStatus: OrderStatus) {
  try{
    const existingOrder = await prismaClient.lineOrder.findUnique({
      where: {
        id,
      },
    });
    if (!existingOrder) {
      return {
        status: "400",
        data: null,
        error: "Order not found",
      };
    }
    const updatedOrder = await prismaClient.lineOrder.update({
      where: {
        id,
      },
      data: {
        status: updateStatus
      },
    });
    return {
      status: "200",
      data: updatedOrder,
      error: null,
    };
  } catch (error) {
    console.error("Failed to change order status by ID:", error);
    return {
      status: "500",
      data: null,
      error: "Failed to change order status by ID",
    };
  }
}