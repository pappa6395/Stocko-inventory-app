"use server"


import { prismaClient } from "@/lib/db";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { OrderLineItem } from "@/redux/slices/pointOfSale";
import { ILineOrder } from "@/type/types";
import { LineOrder, NotificationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";


interface CustomerData {
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  streetAddress?: string;
  unitNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  method?: string;
}
export interface NewOrderProps {
  orderItems: OrderLineItem[];
  orderAmount: number;
  orderType: string;
  source: string;
}

type NotificationProps = {
  message: string;
  status?: NotificationStatus;
  statusText: string;
};

export async function createNotification(data: NotificationProps) {
  try {
    const newNot = await prismaClient.notification.create({
      data,
    });
    revalidatePath("/dashboard");
    return newNot;
  } catch (error) {
    console.log(error);
  }
}
export async function updateNotificationStatusById(id: number) {
  try {
    const updatedNot = await prismaClient.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });
    revalidatePath("/dashboard");
    return {
      data: updatedNot,
      ok: true,
    }
  } catch (error) {
    console.log(error);
  }
}


export async function getNotifications() {
  try {
    const notifications = await prismaClient.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        read: false,
      },
    });
    return notifications;
  } catch (error) {
    console.log(error);
  }
}

export async function createLineOrder(
    newOrder: NewOrderProps,
    customerData: CustomerData,
) {

    const { orderItems, orderAmount, orderType, source } = newOrder
    console.log("Payload checked:", customerData, orderItems, orderAmount, orderType);
    
    try {
        // Transaction => If one of the process fail then they all will fail
        // Model: Products, LineOrderItem, LineOrder, Sale
        // Recieve the data [orderItems]
        // for each item update the stock Qty
        // For each item create LineOrderItem
        // Combine all items to Create a line order
        // For each item we need to create a Sale
        
        const lineOrderId = await prismaClient.$transaction(async (transaction) => {
            // Create the Line Order
            const lineOrder = await transaction.lineOrder.create({
              data: {
                customerId: customerData.customerId,
                customerName: customerData.customerName,
                customerEmail: customerData.customerEmail,
                // Personal details
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                email: customerData.email,
                phone: customerData.customerPhone || customerData.phone,
                // Shipping Address
                streetAddress: customerData.streetAddress,
                unitNumber: customerData.unitNumber,
                city: customerData.city,
                state: customerData.state,
                zipCode: customerData.zipCode,
                country: customerData.country,
                // Payment Method
                paymentMethod: customerData.method,
                // Line Order details
                orderNumber: generateOrderNumber(),
                orderAmount,
                orderType,
                source,
                status: source === "pos" ? "DELIVERED" : "PROCESSING",
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
                    increment: item.qty,
                  }
                },
              });
              if (!updatedProduct) {
                throw new Error(`Failed to update stock for product ID: ${item.id}`);
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

              // Create Line Order Item
              const lineOrderItem = await transaction.lineOrderItem.create({
                  data: {
                  orderId: lineOrder.id,
                  productId: item.id,
                  name: `${item.brand} ${item.name}`,
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
                  productName: `${item.brand} ${item.name}`,
                  productImage: item.productThumbnail ?? "/placeholder.svg",
                  customerName: customerData.customerName,
                  customerEmail: customerData.customerEmail,
                  customerPhone: customerData.phone,
                },
              });
              if (!sale) {
                throw new Error(`Failed to create sale for product ID: ${item.id}`);
              }              
            };

            revalidatePath("/dashboard/sales");
            return lineOrder.id;
        });
        const savedLineOrder = await prismaClient.lineOrder.findUnique({
          where: {
            id: lineOrderId,
          },
          include: {
            lineOrderItems: true,
          }
        });
        console.log(savedLineOrder);
        return {
          success: true,
          data: savedLineOrder as ILineOrder,
          error: null,
        }
    } catch (error) {
        console.error("Transaction error:", error);
        return {
          success: false,
          data: null,
          error: error,
        };
    }
}

export async function getOrders() {
  try {
    const orders = await prismaClient.lineOrder.findMany({
      include: {
        lineOrderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      ok: true,
      data: orders,
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

export async function deleteManySale () {

  try {
    await prismaClient.sale.deleteMany()

  } catch (error) {
    console.error("Failed to delete bulk sale:", error);
    return {
      ok: false,
      data: null,
      error: "Failed to delete bulk sale",
    };
  }
}

export async function deleteManylineOrderItem () {

  try {
    await prismaClient.lineOrderItem.deleteMany()

  } catch (error) {
    console.error("Failed to delete bulk sale:", error);
    return {
      ok: false,
      data: null,
      error: "Failed to delete bulk sale",
    };
  }
}

export async function deleteManylineOrder () {

  try {
    await prismaClient.lineOrder.deleteMany()

  } catch (error) {
    console.error("Failed to delete bulk sale:", error);
    return {
      ok: false,
      data: null,
      error: "Failed to delete bulk sale",
    };
  }
}