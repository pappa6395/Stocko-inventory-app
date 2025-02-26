"use server"

import { prismaClient } from "@/lib/db";
import { ChangePasswordProps, UserProps } from "@/type/types";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import bcrypt from "bcryptjs"
import InviteUserEmail from "@/emails";
import { User } from "@prisma/client";
import PasswordReset from "@/emails/PasswordReset";
import { generateToken } from "@/lib/generateToken";

const resend = new Resend(process.env.RESEND_API_KEY);

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
                status: "400",
                error: `User with this ${email} is already exists`,
                data: null
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
            await sendInvitationEmailToUser(newUser, confirmPassword)
            return {
                status: "200",
                error: null,
                data: newUser
            }
        }
    } catch (err) {
        console.error("Failed to create user:",err);
        return {
            status: "500",
            error: "Failed to create user",
            data: null
        }
    }
}

export async function createUserFromLogin(data: UserProps) {
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
                status: "400",
                error: `User with this ${email} is already exists`,
                data: null
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
                status: "200",
                error: null,
                data: newUser
            }
        }
    } catch (err) {
        console.error("Failed to create user:",err);
        return {
            status: "500",
            error: "Failed to create user",
            data: null
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

    console.log("Update Payload Checked:",data);
    const {
        name, 
        firstName, 
        lastName, 
        email, 
        password,  
        phone, 
        status, 
        roleId, 
        profileImage,
        inviteSent, 
    } = data;

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
                data: {
                    email,
                    firstName,
                    lastName,
                    password,
                    name,
                    phone,
                    profileImage,
                    roleId,
                    status,
                    inviteSent,
                }
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

export async function updateUserPassword(data: ChangePasswordProps) {

    console.log("Update Payload Checked:",data);
    const {
        password,  
        confirmPassword,
        roleId, 
        email,
        userId
    } = data;

        if (!userId || !data) {
            return {
            ok: false,
            data: null,
            error: "Invalid request",
            };
        }
        try {
            const user = await prismaClient.user.findUnique({ where: { id: Number(userId) } });

            if (!user) return {
                ok: false,
                data: null,
                error: "User not found",
            }

            if (password !== confirmPassword) {
                return {
                  ok: false,
                  data: null,
                  error: "Passwords do not match",
                };
              }

            const hashedPassword = await bcrypt.hash(password, 10)
            const updateUser = await prismaClient.user.update({
                where: {
                    id: Number(userId),
                },
                data: {
                    password: hashedPassword,
                }
            });
            //revalidatePath("/login")
            console.log("Password updated successfully");
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


export async function sendInvitationEmailToUser(data: User, temporaryPassword: string) {
   
    const {
        name, 
        firstName, 
        lastName, 
        email, 
        password,  
        phone, 
        status, 
        roleId, 
        profileImage, 
    } = data

    try {
        const userById = await prismaClient.role.findUnique({
            where: {
                id: roleId
            }
        })
        const role = userById?.displayTitle || "";
        const userEmail = email || "";
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        await resend.emails.send({
            from: 'Stocko-Online <admin@89residencexclusive.co>',
            to: userEmail,
            subject: 'Welcome to Stocko-Online - Your Login Credentials',
            react: InviteUserEmail({
                username: firstName,
                password: temporaryPassword,
                loginEmail: userEmail,
                invitedByUsername: 'Admin.Pap',
                invitedByEmail: 'admin@89residencexclusive.co',
                inviteLink: `${baseUrl}/login?userId=${data.id}&roleId=${roleId}&email=${userEmail}`,
                inviteRole: role,
                inviteFromIp: '192.168.0.1',
                inviteFromLocation: 'New York',
            }),
        });
        const invitedUserData: UserProps = {
            email,
            password,
            confirmPassword:  password,
            firstName,
            lastName,
            name,
            phone,
            profileImage,
            roleId,
            status,
            inviteSent: true,
        }
        const userId = data.id.toString();
        await updateUserById(userId, invitedUserData)

    } catch (err) {
        console.error("Failed to send invitation email:",err);
        return {
            ok: false,
            data: null,
            error: "Failed to send invitation email",
        }
    }
   
}

export async function sendPasswordResetToken(email: string) {
    try {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (existingUser?.passwordResetCount || 0 >= 3) {
            return {
                status: "429",
                data: null,
                error: "Too many password reset attempts. Please try again in 30 minutes.",
            }
        }
        const token = generateToken(6)
        await resend.emails.send({
            from: 'Stocko-Online <admin@89residencexclusive.co>',
            to: email,
            subject: 'Reset Password Token',
            react: PasswordReset({
                token: token,
            }),
        });
        const updatedUser = await prismaClient.user.update({
            where: {
                email
            },
            data: {
                passwordResetToken: Number(generateToken(6)),
                passwordResetCount: {
                    increment: (existingUser?.passwordResetCount || 0) + 1,
                },
                passwordResetTokenExpiresAt: new Date(Date.now() + 3600000), // 1 hour
            }
        });
        return {
            status: "200",
            data: updatedUser,
            error: null,
        }
        
    } catch (err) {
        console.error("Failed to send password reset token:",err);
        return {
            status: "500",
            data: null,
            error: "Failed to send password reset token",
        }
    }
}