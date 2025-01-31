"use server"

import { prismaClient } from "@/lib/db";
import { RoleProps } from "@/type/types";
import { revalidatePath } from "next/cache";


export async function createRole(data: RoleProps) {
    console.log("Payload checked:", data);
    const roleTitle = data.roleTitle;
    try {
        const existingRole = await prismaClient.role.findUnique({
            where: {
                roleTitle,
            }
        });
        if (existingRole) {
            return {
                ok: false,
                error: "Role already exists",
                date: null
            }
        }

        const newRole = await prismaClient.role.create({
            data
        });
        revalidatePath("/dashboard/users/roles")
        console.log("New role created:", newRole);
        
        return {
            ok: true,
            error: null,
            date: newRole
        }

    } catch (err) {
        console.error("Failed to create role:",err);
        return {
            ok: false,
            error: "Failed to create role",
            date: null
        }
    }
}

export async function getAllRoles() {
    
    try {
        const roles = await prismaClient.role.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return {
            ok: true,
            data: roles,
            error: null,
        }

    } catch (err) {
        console.error("Failed to get brands:",err);
        return {
            ok: false,
            data: null,
            error: "Failed to get roles",
        }
    }
}

export async function getRoleById(id: string) {

    if (id) {

        try {
            const role = await prismaClient.role.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return {
                ok: true,
                data: role,
                error: null,
            }
        } catch (err) {
            console.error("Failed to find brand by ID:",err);
            return {
                ok: false,
                data: null,
                error: "Failed to find role by ID",
            }
        }
    }
}

export async function updateRoleById(id: string, data: RoleProps) {

    if (id && data) {

        try {
            const updateRole = await prismaClient.role.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/users/roles")
            return {
                ok: true,
                data: updateRole,
                error: null,
            }
        } catch (err) {
            console.error("Failed to update role by ID:",err);
            return {
                ok: false,
                data: null,
                error: "Failed to update role",
            }
        }
    }
}

export async function deleteRoleById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedRole = await prismaClient.role.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/users/roles")
        return {
            ok: true,
            data: deletedRole 
        }
    } catch (err) {
        console.error("Failed to delete role:",err);
        return {
            ok: false,
            data: null,
            error: "Failed to delete role",
        }
    }
}
