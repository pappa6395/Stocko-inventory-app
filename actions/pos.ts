"use server"

import { prismaClient } from "@/lib/db";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { OrderLineItem } from "@/redux/slices/pointOfSale";
import { revalidatePath } from "next/cache";


interface CustomerData {
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export async function createLineOrder(
    orderItems: OrderLineItem[],
    customerData: CustomerData
) {
    
    try {
        // Transaction => If one of the process fail then they all will fail
        // Model: Products, LineOrderItem, LineOrder, Sale
        // Recieve the data [orderItems]
        // for each item update the stock Qty
        // For each item create LineOrderItem
        // Combine all items to Create a line order
        // For each item we need to create a Sale

        return await prismaClient.$transaction(async (transaction) => {
            // Create the Line Order
            const lineOrder = await transaction.lineOrder.create({
              data: {
                customerId: customerData.customerId.toString(),
                customerName: customerData.customerName,
                orderNumber: generateOrderNumber(),
              },
            });
            for (const item of orderItems) {
                // Update Product stock quantity
                const updatedProduct = await transaction.products.update({
                  where: { id: item.id },
                  data: {
                    stockQty: {
                      decrement: item.qty,
                    },
                    saleUnit: {
                      increment: item.qty
                    }
                  },
                });
                if (!updatedProduct) {
                    throw new Error(`Failed to update stock for product ID: ${item.id}`);
                  }

                 // Create Line Order Item
                const lineOrderItem = await transaction.lineOrderItem.create({
                    data: {
                    orderId: lineOrder.id,
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    qty: item.qty,
                    productThumbnail: item.productThumbnail ?? "/placeholder.svg",
                    },
                });

          if (!lineOrderItem) {
            throw new Error(
              `Failed to create line order item for product ID: ${item.id}`
            );
          }
  
          // Create Sale
          const sale = await transaction.sale.create({
            data: {
              orderId: lineOrder.id,
              productId: item.id,
              qty: item.qty,
              salePrice: item.price,
              productName: item.name,
              productImage: item.productThumbnail ?? "/placeholder.svg",
              customerName: customerData.customerName,
              customerEmail: customerData.customerEmail,
              customerPhone: customerData.customerPhone,
            },
          });
          if (!sale) {
            throw new Error(`Failed to create sale for product ID: ${item.id}`);
          }
        }
  
        console.log(lineOrder);
        revalidatePath("/dashboard/sales");
        return {
          success: true,
          data: lineOrder,
          error: null,
        }
      });

    } catch (error) {
        console.error("Transaction error:", error);
        return {
          success: false,
          data: null,
          error: error,
        };
    }
}