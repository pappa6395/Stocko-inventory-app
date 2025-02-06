"use server";

import { prismaClient } from "@/lib/db";
import { createUser, updateUserById } from "./users";
import { revalidatePath } from "next/cache";
import { ICustomer } from "@/type/types";

export interface CustomerDataProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  phone: string;
  profileImage: string;
  billingAddress: string;
  shippingAddress: string;
  additionalInfo?: string;
  roleId: number;
  status: boolean;
  inviteSent?: boolean;
}

export async function createCustomer(customerData: CustomerDataProps) {
  try {
    return await prismaClient.$transaction(async (transaction) => {
      // Create User
      const userData = {
        email: customerData.email,
        password: customerData.password,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        name: `${customerData.firstName} ${customerData.lastName}`,
        phone: customerData.phone,
        profileImage: customerData.profileImage,
        roleId: Number(customerData.roleId),
        status: customerData.status,
        confirmPassword: customerData.confirmPassword || "",
        inviteSent: customerData.inviteSent || false,
      };
      const user = (await createUser(userData))?.data || null;

      // Create Customer
      const customer = await transaction.customers.create({
        data: {
          userId: user!.id,
          billingAddress: customerData.billingAddress,
          shippingAddress: customerData.shippingAddress,
          additionalInfo: customerData.additionalInfo,
        },
        include: {
          user: true,
        },
      });
      console.log(customer);
      revalidatePath("/dashboard/users");
      revalidatePath("/dashboard/sales/customers");
      return customer;
    });
  } catch (error) {
    console.log(error);
  }
}
export async function updateCustomerById(
  customerId: number,
  userId: number,
  customerData: CustomerDataProps
) {
  console.log("CustomerData:", customerData);
  console.log("Customer ID:", customerId);
  console.log("User ID:", userId);
  
  try {
    return await prismaClient.$transaction(async (transaction) => {
      // Update User
      const userData = {
        email: customerData.email,
        password: customerData.password || "",
        confirmPassword: customerData.confirmPassword || "",
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        name: `${customerData.firstName} ${customerData.lastName}`,
        phone: customerData.phone,
        profileImage: customerData.profileImage,
        roleId: Number(customerData.roleId),
        status: customerData.status,
        inviteSent: customerData?.inviteSent || true,
      };
      const updatedUser = await updateUserById(String(userId), userData);
      console.log("updatedUser:", updatedUser?.data);
      // Update Customer
      const updatedCustomer = await transaction.customers.update({
        where: {
          id: customerId,
        },
        data: {
          billingAddress: customerData.billingAddress,
          shippingAddress: customerData.shippingAddress,
          additionalInfo: customerData.additionalInfo,
        },
      });
      console.log("UpdatedCustomer:",updatedCustomer);
      return {
        ok: true,
        data: updatedCustomer,
        error: null,
      }
    });
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      data: null,
      error: "Failed to update customer",
    }
  }
}

export async function getAllCustomers() {
  try {
    const customers = await prismaClient.customers.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,  
      },
    })

    return {
        ok: true,
        data: customers as ICustomer[],
        error: null,
      };
  } catch (error) {
    console.log(error);
    return {
        ok: false,
        data: null,
        error: "Failed to get customers",
    };
  }
}

export async function getCustomerById(id: string) {
  try {
    const customer = await prismaClient.customers.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        user: true,
      },
    });
    return {
        ok: true,
        data: customer as ICustomer,
        error: null,
    }
  } catch (error) {
    console.log(error);
    return {
        ok: false,
        data: null,
        error: "Failed to get customer by ID",
    };
  }
}


