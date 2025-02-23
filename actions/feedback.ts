"use server"

import { prismaClient } from "@/lib/db";
import { FeedbackProps } from "@/type/types";


export async function createFeedback(data: FeedbackProps) {

    try {
        const feedback = await prismaClient.feedback.create({
            data,
        })
        console.log(feedback);
        return {
            success: true,
            data: feedback,
            error: null,
        }
    } catch (err) {
        console.error("Failed to create feedback:", err);
        return {
            success: false,
            data: null,
            error: "Failed to create feedback",
        };
    }
}

export async function getAllFeedbacks() {
    try {
        const feedbacks = await prismaClient.feedback.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
        return {
            success: true,
            data: feedbacks,
            error: null,
        }
    } catch (err) {
        console.error("Failed to get feedbacks:", err);
        return {
            success: false,
            data: null,
            error: "Failed to get feedbacks",
        };
    }
}

export async function getFeedbackById(id: number) {
    try {
        const feedback = await prismaClient.feedback.findUnique({
            where: {
                id,
            },
        });
        return {
            success: true,
            data: feedback,
            error: null,
        }
    } catch (err) {
        console.error("Failed to get feedback by ID:", err);
        return {
            success: false,
            data: null,
            error: "Failed to get feedback by ID",
        };
    }
}

export async function updateFeedback(id: number, data: FeedbackProps) {
    try {
        const updatedFeedback = await prismaClient.feedback.update({
            where: {
                id,
            },
            data,
        });
        return {
            success: true,
            data: updatedFeedback,
            error: null,
        }
    } catch (err) {
        console.error("Failed to update feedback by ID:", err);
        return {
            success: false,
            data: null,
            error: "Failed to update feedback",
        };
    }
}

export async function deleteFeedback(id: number) {
    try {
        await prismaClient.feedback.delete({
            where: {
                id,
            },
        });
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        console.error("Failed to delete feedback by ID:", err);
        return {
            success: false,
            data: null,
            error: "Failed to delete feedback",
        };
    }
}

export async function createBulkFeedback(feedbacks: FeedbackProps[]) {

    try {
        for (const feedback of feedbacks) {
            await createFeedback(feedback);
        }

    } catch (err) {
        console.error("Failed to create bulk feedback:", err);
        return {
            success: false,
            data: null,
            error: "Failed to create bulk feedback",
        };
    }
}