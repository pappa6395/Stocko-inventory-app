"use server"

import { prismaClient } from "@/lib/db";
import { UserProps } from "@/type/types";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs"



export async function createUser(data: UserProps) {
    console.log("Payload checked:", data);
    const { 
        firstName, 
        lastName, 
        email, 
        password, 
        confirmPassword, 
        phone, 
        status, 
        roleId, 
        profileImage 
    } = data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const isMatch = await bcrypt.compare(confirmPassword, hashedPassword)
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email,
            }
        });
        if (existingUser) {
            return {
                ok: false,
                error: "Role already exists",
                date: null
            }
        }

        if (isMatch && !existingUser) {
            const newUser = await prismaClient.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    name: `${data.firstName} ${data.lastName}`,
                    phone,
                    profileImage,
                    roleId,
                    status,
                }
            });
            revalidatePath("/dashboard/users")
            console.log("New user created:", newUser);
            
            return {
                ok: true,
                error: null,
                date: newUser
            }
        }
    } catch (err) {
        console.error("Failed to create user:",err);
        return {
            ok: false,
            error: "Failed to create user",
            date: null
        }
    }
}

export async function getAllUsers() {
    
    try {
        const users = await prismaClient.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                role: true
            }
        });

        return {
            ok: true,
            data: users,
            error: null,
        }

    } catch (err) {
        console.error("Failed to get users:",err);
        return {
            ok: false,
            data: null,
            error: "Failed to get users",
        }
    }
}

export async function getUserById(id: string) {

    if (id) {

        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return {
                ok: true,
                data: user,
                error: null,
            }
        } catch (err) {
            console.error("Failed to find user by ID:",err);
            return {
                ok: false,
                data: null,
                error: "Failed to find user by ID",
            }
        }
    }
}

export async function updateUserById(id: string, data: UserProps) {

    
    if (id && data) {

        try {
            // let passwordToUpdate = existingUser?.password;
            // // Check if the password has changed
            // const isSamePassword = await bcrypt.compare(password, existingUser.password);

            // if (!isSamePassword) {
            //     // If changed, hash the new password
            //     const saltRounds = 10;
            //     passwordToUpdate = await bcrypt.hash(password, saltRounds);
            // }
            const updateUser = await prismaClient.user.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/users")
            return {
                ok: true,
                data: updateUser,
                error: null,
            }
        } catch (err) {
            console.error("Failed to update user by ID:",err);
            return {
                ok: false,
                data: null,
                error: "Failed to update user",
            }
        }
    }
}

export async function deleteUserById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedUser = await prismaClient.user.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/users")
        return {
            ok: true,
            data: deletedUser 
        }
    } catch (err) {
        console.error("Failed to delete user:",err);
        return {
            ok: false,
            data: null,
            error: "Failed to delete user",
        }
    }
}
