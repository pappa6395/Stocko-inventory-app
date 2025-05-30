"use server";

import { NotificationStatus, PurchaseOrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createNotification } from "./pos";
import { generateOrderNumber } from "../lib/generateOrderNumber";
import { PurchaseOrderProps } from "@/type/types";
import { prismaClient } from "@/lib/db";

export async function createPurchase(data: PurchaseOrderProps) {
  const {
    notes,
    balanceAmount,
    totalAmount,
    shippingCost,
    tax,
    discount,
    items,
    status,
    supplierId,
  } = data;

  try {
    const purchaseOrderId = await prismaClient.$transaction(async (transaction) => {
      // Create the Purchase
      const purchase = await transaction.purchaseOrder.create({
        data: {
          notes,
          balanceAmount,
          totalAmount,
          shippingCost,
          tax,
          discount,
          supplierId,
          status,
          refNo: generateOrderNumber(),
        },
      });

      for (const item of items) {
        // Update Product stock quantity

        const updatedProduct = await transaction.products.update({
          where: { id: item.productId },
          data: {
            stockQty: {
              increment: item.quantity,
            },
          },
        });

        if (!updatedProduct) {
          throw new Error(
            `Failed to update stock for product ID: ${item.productId}`
          );
        }

        if (updatedProduct.stockQty < updatedProduct.alertQuantity) {
          // Send/Create the Notification
          const message =
            updatedProduct.stockQty === 0
              ? `The stock of ${updatedProduct.name} is out. Current stock: ${updatedProduct.stockQty}.`
              : `The stock of ${updatedProduct.name} has gone below threshold. Current stock: ${updatedProduct.stockQty}.`;
          const statusText =
            updatedProduct.stockQty === 0 ? "Stock Out" : "Warning";
          const status: NotificationStatus =
            updatedProduct.stockQty === 0 ? "DANGER" : "WARNING";

          const newNotification = {
            message,
            status,
            statusText,
          };
          await createNotification(newNotification);
          // Send email
        }
        // Create Purchase Order Item
        const purchaseItem = await transaction.purchaseOrderItem.create({
          data: {
            purchaseOrderId: purchase.id,
            productId: item.productId,
            productName: item.productName,
            currentStock: item.currentStock,
            quantity: item.quantity,
            unitCost: item.productCost,
            subTotal: item.subTotal,
          },
        });

        if (!purchaseItem) {
          throw new Error(`Failed to create purchase item`);
        }
      }
      // console.log(savedLineOrder);
      revalidatePath("/dashboard/stock/purchases");
      return purchase.id;
    });

    const savedPurchaseOrder = await prismaClient.purchaseOrder.findUnique({
      where: {
        id: purchaseOrderId,
      },
      include: {
        items: true,
      },
    });
    // console.log(savedLineOrder);
    return savedPurchaseOrder;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error; // Propagate the error to the caller
  }
}

export async function getPurchaseOrders() {
  try {
    const purchases = await prismaClient.purchaseOrder.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
        supplier: true,
      },
    });
    return purchases;
  } catch (error) {
    console.log(error);
  }
}
export type PurchaseStatusData = {
  status: PurchaseOrderStatus;
};
export async function changePurchaseOrderStatusById(
  id: number,
  data: PurchaseStatusData
) {
  try {
    const existingOrder = await prismaClient.purchaseOrder.findUnique({
      where: {
        id,
      },
    });
    if (!existingOrder) {
      return;
    }
    const updatedOrder = await prismaClient.purchaseOrder.update({
      where: {
        id,
      },
      data,
    });
    return {
      error: null,
      status: 200,
      data: updatedOrder,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      status: 500,
      data: null,
    };
  }
}

export async function getPurchaseOrderById(id: number) {
  try {
    const purchase = await prismaClient.purchaseOrder.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
        supplier: true,
      },
    });
    return purchase;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePurchaseOrderById(
  id: number,
  data: PurchaseOrderProps
) {
  const {
    notes,
    balanceAmount,
    totalAmount,
    shippingCost,
    tax,
    discount,
    items,
    status,
    supplierId,
  } = data;

  try {
    const updatedPurchaseOrder = await prismaClient.$transaction(
      async (transaction) => {
        // Create the Purchase
        const purchase = await transaction.purchaseOrder.update({
          where: {
            id,
          },
          data: {
            notes,
            balanceAmount,
            totalAmount,
            shippingCost,
            tax,
            discount,
            supplierId,
            status,
            refNo: generateOrderNumber(),
          },
        });

        for (const item of items) {
          // Update Product stock quantity

          const updatedProduct = await transaction.products.update({
            where: { id: item.productId },
            data: {
              stockQty: {
                increment: item.quantity,
              },
            },
          });

          if (!updatedProduct) {
            throw new Error(
              `Failed to update stock for product ID: ${item.productId}`
            );
          }
        }
        // console.log(savedLineOrder);
        revalidatePath("/dashboard/stock/purchase");
        return purchase;
      }
    );
    return updatedPurchaseOrder;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error; // Propagate the error to the caller
  }
}

export async function deletePurchaseOrder(id: number) {
  console.log("payload check: ", id);
  
  try {
    const existingOrder = await prismaClient.purchaseOrder.findUnique({
      where: {
        id,
      }
    })
    if (!existingOrder) {
      console.log("Purchase Order not found");
      return {
        ok: false,
        error: "Purchase Order not found",
      };
    }

    const deletedOrder = await prismaClient.purchaseOrder.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/stock/purchase");
    return {
      ok: true,
      data: deletedOrder,
    };
  } catch (error) {
    console.log(error);
  }
}
