"use client";


import { useEffect, useState } from "react";
import { Description, Label, RadioGroup } from "@headlessui/react";
import { Check, CreditCard, Handshake, Loader2 } from "lucide-react";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setPaymentMethod } from "@/redux/slices/checkoutSlice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/redux/slices/cartSlice";


const plans = [
  {
    name: "Cash on Delivery",
    description: "Pay your money after receiving the Products",
    icon: Handshake,
    method: "cod",
  },
  {
    name: "Credit Card",
    description: "Securely pay with Stripe",
    icon: CreditCard,
    method: "card",
  },
];

const PaymentMethod = () => {

    const [selected, setSelected] = useState(plans[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);
    
    const router = useRouter();
    const cartItems = useAppSelector((state) => state.cart.cartItems)
    const personalDetails = useAppSelector((state) => state.checkout.personalDetails)
    const shippingAddress = useAppSelector((state) => state.checkout.shippingAddress)

    const dispatch = useAppDispatch();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    
    useEffect(() => {
        const allCartItems = localStorage.getItem('cart');
        if (allCartItems) {
            setAllCartItems(JSON.parse(allCartItems));
        }
    },[cartItems])
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const method = selected.method
        const data = {
            method
        }
        dispatch(
            setPaymentMethod(data)
        );
        const checkoutData = {
            ...personalDetails,
            ...shippingAddress,
            method,
        }
        console.log(checkoutData);
        router.push("order/order-success")
        // Sending to API endpoint

        try {
            const response = await fetch(`${baseUrl}/api/checkout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ products: allCartItems }),
            });
       
            const data = await response.json();
            console.log("Stripe Data:",data);
       
            if (data?.url) {
              // console.log(response.url);
              const url = data?.url;
              setIsLoading(false);
              console.log(url);
              window.location.href = url;
              // router.replace(url);
            }
          } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
          }
    }


  return (

    <div className="mt-4">
        <h2 className='text-lg font-semibold'>Payment Method</h2>
        <form className="" onSubmit={handleSubmit}>
            <div className="w-full py-4 sm:px-8">
                <div className="sm:mx-auto w-full ">
                <RadioGroup value={selected} onChange={setSelected}>
                    <Label className="sr-only">
                        Server size
                    </Label>
                    <div className="flex flex-wrap gap-3 items-center sm:space-x-3 justify-between">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        return (
                        <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={({ active, checked }) =>
                            `${
                                active
                                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                                : ""
                            }
                        ${checked ? "bg-slate-900 text-white" : "bg-white"}
                            relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                        >
                            {({ checked }) => (
                            <>
                                <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex items-center space-x-2">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100">
                                        <Icon className="w-6 h-6 text-slate-700" />
                                    </div>
                                    <div className="text-sm">
                                        <Label
                                        as="p"
                                        className={`font-medium  ${
                                            checked ? "text-white" : "text-gray-900"
                                        }`}
                                        >
                                        {plan.name} 
                                        </Label>
                                        <Description
                                        as="span"
                                        className={`inline ${
                                            checked ? "text-sky-100" : "text-gray-500"
                                        }`}
                                        >
                                        <span>{plan.description}</span>{" "}
                                        </Description>
                                    </div>
                                    </div>
                                </div>
                                {checked && (
                                    <div className="shrink-0 text-white">
                                    <Check className="h-6 w-6" />
                                    </div>
                                )}
                                </div>
                            </>
                            )}
                        </RadioGroup.Option>
                        );
                    })}
                    </div>
                </RadioGroup>
                </div>
            </div>
            <div className='flex justify-between mt-6 px-2'>
                <PreviousButton />
                {isLoading ? (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Please wait
                    </Button>
                    ) : (
                        <NextButton />
                    )}
            </div>
        </form>
    </div>
    
  );
}

export default PaymentMethod;