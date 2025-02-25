"use client"

import { createLineOrder } from '@/actions/pos';
import OrderInvoice from '@/components/frontend/orders/OrderInvoice';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { ILineOrder } from '@/type/types';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import * as htmlToImage from 'html-to-image';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CartItem, getInitialCartItems, removeAllProductsFromCart, saveItemsToLocalStorage } from '@/redux/slices/cartSlice';
import { CheckoutState, loadState, saveState } from '@/redux/slices/checkoutSlice';


const page = () => {

    const [processing, setProcessing] = useState(false);
    const [order, setOrder] = useState<ILineOrder | null>(null);
    //const {data: session, status} = useSession()
    const params = useSearchParams();
    const userId = params.get('id') || "";

    const cartItems = useAppSelector((state) => state.cart.cartItems)
    const personalDetails = useAppSelector((state) => state.checkout.personalDetails)
    const shippingAddress = useAppSelector((state) => state.checkout.shippingAddress)
    const paymentMethod = useAppSelector((state) => state.checkout.paymentMethod)

    const dispatch = useAppDispatch();
    //const isMounted = useRef(false);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [storedCartItems, setStoredCartItems] = useState<CartItem[]>([]);
    const [storedCheckoutData, setStoredCheckoutData] = useState<CheckoutState>();
    const totalSum = storedCartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    const router = useRouter();
    console.log("StoredCartItems:" , storedCartItems);
    console.log("StoredCheckoutData:" , storedCheckoutData);
    console.log("CartItems:" , cartItems);
    

    useEffect(() => {
      const initalCartItems = localStorage.getItem('cart')
      if (initalCartItems) {
        setStoredCartItems(JSON.parse(initalCartItems))
      }

      const initialCheckoutData = localStorage.getItem('checkoutState')
      if (initialCheckoutData) {
        setStoredCheckoutData(JSON.parse(initialCheckoutData));
      }
      
    },[])


    useEffect(() => { 
      
      const handleCreateOrder = async () => {
        
        setProcessing(true);
        const customerData = {
            customerId: Number(userId) ?? "",
            customerName: `${storedCheckoutData?.personalDetails?.firstName ?? ""} ${storedCheckoutData?.personalDetails?.lastName ?? ""}`,
            customerEmail: storedCheckoutData?.personalDetails?.email ?? "",
            customerPhone: storedCheckoutData?.personalDetails?.phone?? "",
            firstName: storedCheckoutData?.personalDetails?.firstName ?? "",
            lastName: storedCheckoutData?.personalDetails?.lastName?? "",
            email: storedCheckoutData?.personalDetails?.email?? "",
            phone: storedCheckoutData?.personalDetails?.phone ?? "",
            unitNumber: storedCheckoutData?.shippingAddress.unitNumber ?? "",
            streetAddress: storedCheckoutData?.shippingAddress.streetAddress?? "",
            city: storedCheckoutData?.shippingAddress.city?? "",
            state: storedCheckoutData?.shippingAddress.state?? "",
            country: storedCheckoutData?.shippingAddress.country ?? "",
            zipCode: storedCheckoutData?.shippingAddress.zipCode?? "",
            method: storedCheckoutData?.paymentMethod.method ?? "card",
            
        }
        console.log("Customer Data:",customerData);
        
        const orderItems = storedCartItems.map((item) => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                brand: item.brand,
                qty: item.qty,
                productThumbnail: item.image
            }
        })
        const orderAmount = totalSum
        const newOrder = {
            orderItems,
            orderAmount,
            orderType: "Sale",
            source: "store"
        }
        console.log("OrderCartItem",orderItems);
        console.log(newOrder);

        if (!customerData || !orderItems || !orderAmount ) return;
        
        try {
            const savedOrder = await createLineOrder(newOrder, customerData)
            const data = savedOrder?.data
            console.log("Order created", data);
            if (savedOrder?.success) {
                setOrder(data ?? null);
                setProcessing(false);
                setSuccess(true);
                localStorage.setItem("saveOrder", JSON.stringify(savedOrder));
                
                const newOrderId = data?.id || 0
                const newCustomerEmail = data?.customerEmail || "";

                await new Promise(resolve => setTimeout(resolve, 1000)); 
                
                await handleSaveReceiptWithRetry(newOrderId, newCustomerEmail);
                // Remove all items from cart
                dispatch(
                  removeAllProductsFromCart()
               )
            }
            
        } catch (error) {
            console.log("Error creating order", error);
            setProcessing(false);
        } 
    }
    const savedOrder = localStorage.getItem("savedOrder");
    if (savedOrder && storedCartItems.length === 0) {
      setOrder(JSON.parse(savedOrder));
      setSuccess(true);
    } else if (userId) {
      handleCreateOrder();
    } else {
      return;
    }
   
    
    },[storedCartItems])

    const contentRef = React.useRef<HTMLDivElement>(null)

    // ✅ Function to save receipt with retry logic
    const handleSaveReceiptWithRetry = async (orderId: number, customerEmail: string) => {
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                const result = await handleSaveReceipt(orderId, customerEmail);
                if (result?.data?.success) {
                    toast.success("✅ Order placed and receipt sent successfully!");
                    return;
                } else {
                    //throw new Error("❌ Print failed");
                    return;
                }
            } catch (error: any) {
                console.error(`⚠️ Print attempt ${retryCount + 1} failed:`, error);

                // Stop retrying if it's a client-side error (400-499)
                if (error.response?.status >= 400 && error.response?.status < 500) {
                    toast.error("❌ Order placed but failed to send receipt (Client Error)");
                    break;
                }

                retryCount++;
                if (retryCount === maxRetries) {
                    toast.error("❌ Order placed but failed to send receipt after multiple attempts");
                } else {
                    // Exponential backoff delay (1s → 2s → 4s)
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
                }
            }
        }   

        setProcessing(false); // Only setProcessing(false) after all retries
    };

    const handleSaveReceipt = async (orderId: number, customerEmail: string) => {
        if (!contentRef.current) return;
    
        try {
        // Convert div to image
        const dataUrl = await htmlToImage.toPng(contentRef.current);
        // Change dataUrl to base64 encoded
        const base64Image = dataUrl.split(',')[1];

        // Send to API
        const response = await axios.post("/api/send-receipt", {
          imageData: base64Image as string,
          email: customerEmail as string,
          orderId: orderId as number,
        });

        if (response.data.success) {
            console.log(`✅ ${response.data.message} successfully!`);
            toast.success("Receipt saved and emailed successfully!");
            return response;
        } else {
            //console.error("❌ Failed to save receipt:", response.data.error);
            return;
        }

        } catch (error) {
            console.error("Error capturing image:", error);
        }
        
    };

    

    // if (isLoading) {
    //     return (
    //       <div className="min-h-96 flex items-center justify-center">
    //         <Button disabled>
    //           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    //           Loading User ...
    //         </Button>
    //       </div>
    //     );
    // }

  return (

    <div className="container p-8">
      {processing ? (
        <div className="min-h-96 flex items-center justify-center">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Invoice Please wait
          </Button>
        </div>
      ) : (
        <>
          {order && order.id ? (
            <OrderInvoice contentRef={contentRef} order={order} />
          ) : (
            <div className="min-h-96 flex items-center justify-center">
              <Button disabled>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 Loading User ...
              </Button>
            </div>
          )}
        </>
      )}
    </div>

  )
}

export default page