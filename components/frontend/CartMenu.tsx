"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { CartItem, decrementQty, incrementQty, removeProductFromCart } from "@/redux/slices/cartSlice";
import {
  Headset,
  HelpCircle,
  LogOut,
  Mail,
  MessageSquareMore,
  Minus,
  PhoneCall,
  Plus,
  Presentation,
  Settings,
  ShoppingCart,
  Trash,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function CartMenu({from="header"}: {from?: string}) {

    const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    const dispatch = useAppDispatch();

    useEffect(() => {
      const allCartItems = localStorage.getItem('cart');
      if (allCartItems) {
        setAllCartItems(JSON.parse(allCartItems));
      }
    },[cartItems])
    
    function handleRemove(id: number) {
        dispatch(removeProductFromCart(id));
    }
    function handleDecrement(id: number) {
        dispatch(
            decrementQty(id)
        );
    }
    function handleIncrement(id: number) {
      dispatch(
            incrementQty(id)
        );
    }

    const sumItems = useMemo(() => allCartItems.reduce((sum, item) => sum + item.qty, 0), [allCartItems]).toString().padStart(2,'0')
    const totalSum = allCartItems.reduce(
        (sum, item) => sum + item.price * item.qty,0
    );
    
    
  return (
    <Sheet>
      <SheetTrigger asChild>
       {from === "header" ? (
         <button className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg ">
          <ShoppingCart className="text-lime-700 dark:text-lime-500" />
          <span className="sr-only">Cart</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  rounded-full -top-0 end-6 dark:border-gray-900">
            {sumItems}
          </div>
        </button>
       ) : (
        <Button variant={'outline'} size='sm'>
            Edit Cart
        </Button>
       )}
      </SheetTrigger>
      {allCartItems && allCartItems.length > 0 ? (
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 border-b pb-3">
              Shopping Cart ({sumItems})
            </SheetTitle>
          </SheetHeader>
          {/* CONTENT HWRE */}
          <div className="">
            {allCartItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-between gap-4 py-3 border-b "
                >
                  <Image
                    width={200}
                    height={200}
                    alt="cart image"
                    src={item.image}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="flex flex-col items-start justify-start space-y-2 flex-shrink-0">
                    <h2 className="text-xs w-[16ch] truncate font-medium">{item.brand} {item.name}</h2>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs flex items-center text-red-500"
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-sx">${item.price.toLocaleString("en-US")}</h2>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="border shadow rounded flex items-center 
                        justify-center w-10 h-7"
                        >
                        <Minus className="w-4 h-4" />
                      </button>

                      <p>{item.qty}</p>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="border shadow rounded flex items-center 
                        justify-center w-10 h-7 bg-slate-800 text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="space-y-1 py-3 border-b mb-3">
              <div className="flex items-center justify-between text-sm">
                <h2 className="font-medium">Total</h2>
                <p>${totalSum.toLocaleString("en-US")}</p>
              </div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant={"outline"} type="submit">
                Continue Shopping
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild>
                <Link href="/checkout">
                  <span>Proceed to Checkout</span>
                </Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      ) : (
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 border-b pb-3">
              Empty Cart
            </SheetTitle>
          </SheetHeader>
          {/* CONTENT HERE */}
          <div className="min-h-80  flex-col space-y-4 flex items-center justify-center">
            <Image
              src="/empty-cart.png"
              width={300}
              height={300}
              alt="empty cart"
              className="w-36 h-36 object-cover"
            />
            <h2>Your Cart Empty</h2>
            <SheetClose asChild>
              <Button asChild size={"sm"} variant={"outline"} type="submit">
                <Link href="/">Continue Shopping to add Items</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
}