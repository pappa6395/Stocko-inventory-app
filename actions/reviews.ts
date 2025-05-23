"use server";

import { BrandProps, FeedbackProps } from "@/type/types";
import { revalidatePath } from "next/cache";
import { ReviewFormProps } from "@/components/frontend/ProductReviewForm";
import { prismaClient } from "@/lib/db";


export async function createReview(data: ReviewFormProps) {
  try {
    const newReview = await prismaClient.review.create({
      data,
    });
    // console.log(newFeedback);
    revalidatePath("/dashboard/inventory/products");
    return newReview;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getApprovedProductReviews(productId: number) {
  if (productId) {
    try {
      const reviews = await prismaClient.review.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          productId,
          status: true,
        },
      });

      return reviews;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export async function getProductReviews(productId: number) {
  if (productId) {
    try {
      const reviews = await prismaClient.review.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          productId,
        },
      });
      return reviews;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function deleteReview(id: number) {
  try {
    const deletedReview = await prismaClient.review.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deletedReview,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateReviewById(id: number, status: boolean) {
  try {
    const updatedReview = await prismaClient.review.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
    console.log(updatedReview);
    revalidatePath("/dashboard/inventory/products");
    return updatedReview;
  } catch (error) {
    console.log(error);
  }
}
