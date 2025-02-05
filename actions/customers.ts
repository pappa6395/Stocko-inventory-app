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
  userId: string,
  customerData: CustomerDataProps
) {
  try {
    return await prismaClient.$transaction(async (transaction) => {
      // Update User
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
        confirmPassword: "",
        inviteSent: false,
      };
      const updatedUser = await updateUserById(userId, userData);
      console.log("updatedUser:",updatedUser);
      // Update Customer
      const updatedCustomer = await transaction.customers.update({
        where: {
          id: Number(customerId),
        },
        data: {
          billingAddress: customerData.billingAddress,
          shippingAddress: customerData.shippingAddress,
          additionalInfo: customerData.additionalInfo,
        },
      });
      console.log("UpdatedCustomer:",updatedCustomer);
      return updatedCustomer;
    });
  } catch (error) {
    console.log(error);
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
    });

    return customers;
  } catch (error) {
    console.log(error);
    return null;
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
    return customer as ICustomer;
  } catch (error) {
    console.log(error);
  }
}


