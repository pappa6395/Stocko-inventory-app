"use server";

import { NotificationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createNotification } from "./pos";
import { generateOrderNumber } from "../lib/generateOrderNumber";
import { prismaClient } from "@/lib/db";
import { AdjustmentDataProps } from "@/components/dashboard/Forms/AdjustmentForm";

export async function createAdjustment(data: AdjustmentDataProps) {
  const { reason, items } = data;
  try {
    const adjustmentId = await prismaClient.$transaction(async (transaction) => {
      // Create the adjustment
      const adjustment = await transaction.adjustment.create({
        data: {
          reason,
          refNo: generateOrderNumber(),
        },
      });

      for (const item of items) {
        // Update Product stock quantity
        let query;
        if (item.type === "Addition") {
          query = {
            increment: item.quantity,
          };
        } else if (item.type === "Subtraction") {
          query = {
            decrement: item.quantity,
          };
        }
        const updatedProduct = await transaction.products.update({
          where: { 
            id: Number(item.productId) 
          },
          data: {
            stockQty: query,
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
        // Create Adjustment Item
        const adjustmentItem = await transaction.adjustmentItem.create({
          data: {
            adjustmentId: adjustment.id,
            productId: Number(item.productId),
            productName: item.productName,
            currentStock: item.currentStock,
            quantity: item.quantity,
            type: item.type,
          },
        });

        if (!adjustmentItem) {
          throw new Error(`Failed to create adjustment`);
        }
      }
      // console.log(savedLineOrder);
      revalidatePath("/dashboard/stock/adjustments");
      return adjustment.id;
    });

    const savedAdjustment = await prismaClient.adjustment.findUnique({
      where: {
        id: adjustmentId,
      },
      include: {
        items: true,
      },
    });
    // console.log(savedLineOrder);
    return savedAdjustment;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error; // Propagate the error to the caller
  }
}

export async function getAdjustments() {
  try {
    const adjustments = await prismaClient.adjustment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
      },
    });
    return adjustments;
  } catch (error) {
    console.log(error);
  }
}
