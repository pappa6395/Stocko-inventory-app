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

export async function getOrderReportByCustomerId(
  id: number,
  page: number,
  pageSize: number
) {
  try {
    const orders = await prismaClient.lineOrder.findMany({
      where: {
        customerId: id,
      },
      include: {
        lineOrderItems: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const totalCount = await prismaClient.lineOrder.count({
      where: {
        customerId: id,
      },
    });
    return {
      orders: orders as ILineOrder[],
      totalCount,
    };
  } catch (error) {
    console.log(error);
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

export type StatusData = {
  status: OrderStatus;
};

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

export type CustomerWithOrderDetails = {
  totalOrders: number;
  totalRevenue: number;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string | null;
  createdAt: Date;
};
export async function getCustomersWithOrders() {
  try {
    // Get customer details with total orders and total revenue from the Sale model
    const customersWithOrderStats = await prismaClient.sale.groupBy({
      by: ["customerEmail", "customerName"],
      _sum: {
        salePrice: true,
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _max: {
          createdAt: "desc",
        },
      },
    });
    // console.log(customersWithOrderStats);

    // Fetch additional user information for each customer
    const customers = await prismaClient.user.findMany({
      where: {
        email: {
          in: customersWithOrderStats.map((item) => item.customerEmail ?? ""),
        },
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        profileImage: true,
        createdAt: true,
        id: true,
      },
    });

    // Merge the customer details with the order statistics
    const customersWithDetails = customers.map((customer) => {
      const orderStats = customersWithOrderStats.find(
        (stats) => stats.customerEmail === customer.email
      );

      return {
        ...customer,
        totalOrders: orderStats?._count._all || 0,
        totalRevenue: orderStats?._sum.salePrice || 0,
      };
    });
    // console.log(customersWithDetails);
    return customersWithDetails;
  } catch (error) {
    console.log(error);
  }
}