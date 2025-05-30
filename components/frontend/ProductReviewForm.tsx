"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import SubmitButton from "../global/FormInputs/SubmitButton";
import { useForm } from "react-hook-form";
import { Send, Star } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { createReview } from "@/actions/reviews";
import toast from "react-hot-toast";
import TextArea from "../global/FormInputs/TextAreaInput";

export type ReviewFormProps = {
  comment: string;
  rating: number;
  productId: number;
  name: string;
  image: string;
  userId: number;
};
export default function ProductReviewForm({
  session,
  productId,
  returnUrl,
}: {
  session: Session | null;
  productId: number;
  returnUrl: string;
}) {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormProps>();
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  async function submitFeedback(data: ReviewFormProps) {
    setLoading(true);
    const user = session?.user;
    data.rating = rating;
    data.productId = Number(productId);
    (data.image = user?.image ?? ""), (data.userId = Number(user?.id) ?? 0);
    data.name = user?.name ?? "";
    try {
      console.log(data);
      await createReview(data);
      toast.success("Review Submitted Successfully!");
      setLoading(false);
      reset();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const [reviewAuthErr, setReviewAuthError] = useState("");
  const router = useRouter();
  function alertUser() {
    setReviewAuthError("You need to Login to review this Product");
    router.push(`/login?returnUrl=${returnUrl}`);
  }

  return (
    <>
      {session ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'receipt'}>Write a Review</Button>
          </SheetTrigger>
          
          <SheetContent
            className="max-w-4xl mx-auto rounded-lg p-6"
            side={"bottom"}
          >
            <SheetHeader>
                <SheetTitle>
                    Tell us about this Product
                </SheetTitle>
                <SheetDescription>
                    Write a review for this product to share your experience with others
                </SheetDescription>
            </SheetHeader>
            <div className="shadow rounded-md border border-gray-200/50 p-4">
              {/* Give us A feedback */}
              <p className="pt-3">Tap on the Star to give it a rating</p>
              {/* <Star fill="orange" stroke="orange" /> */}
              <div className="py-3 flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star, i) => {
                  return (
                    <Star
                      key={i}
                      className="text-orange cursor-pointer"
                      onClick={() => setRating(star)}
                      fill={i <= rating - 1 ? "orange" : "white"}
                      stroke={i <= rating - 1 ? "orange" : "black"}
                    />
                  );
                })}
              </div>
              <div className="py-4">
                <form className="" onSubmit={handleSubmit(submitFeedback)}>
                  <div className="grid gap-3">
                    <TextArea
                      register={register}
                      errors={errors}
                      label="Comment"
                      name="comment"
                      placeholder="Tell us the reason for the above rating"
                    />
                    <SubmitButton
                      title="Submit Review"
                      loadingTitle="Submitting Please wait"
                      variant={'feedback'}
                      loading={loading}
                      buttonIcon={Send}
                    />
                  </div>
                </form>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <>
          <Button onClick={alertUser}>Write a review</Button>
          {reviewAuthErr && (
            <p className="py-6 px-4 border rounded-lg text-red-500 my-4">
              {reviewAuthErr}
            </p>
          )}
        </>
      )}
    </>
  );
}
