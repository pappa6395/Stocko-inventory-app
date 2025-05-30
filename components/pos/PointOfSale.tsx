"use client"

import { Brand, Category, Products, SubCategory, User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import ItemCard from './item-card'
import OrderCard from './order-card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { addProductToOrderLine, decrementQty, incrementQty, loadOrderLineItem, OrderLineItem, removeProductFromOrderLine, removeProductsfromLocalStorage } from '@/redux/slices/pointOfSale'
import SearchItems from './search-items'
import FormSelectInput from '../global/FormInputs/FormSelectInput'
import { ICategory, ICustomer, IProducts, ISubCategory, IUser } from '@/type/types'
import { createLineOrder, NewOrderProps } from '@/actions/pos'
import { Loader, ShoppingBasket } from 'lucide-react'
import toast from 'react-hot-toast'
import ReceiptPrint from './receiptPrint'
import { useReactToPrint } from 'react-to-print'
import * as htmlToImage from 'html-to-image';
import axios from "axios";
import { loadHistory } from '@/redux/slices/historySlice'
import { CartItem, getInitialCartItems } from '@/redux/slices/cartSlice'
import { CheckoutState } from '@/redux/slices/checkoutSlice'
import { CustomerDataProps } from '@/actions/customers'


type CustomerOptionProps = {
    value: string;
    label: string;
    email: string;
    phone: string;
}

export interface ProductwithBrand extends Products {
    brand: Brand;
}

const PointOfSale = ({
    categories,
    products,
    customers, 
    cate
}: {
    categories?: Category[]; 
    products?: ProductwithBrand[];
    customers?: IUser[];
    cate: string;
}) => {
    
    const [clientOrderLineItems, setClientOrderLineItems] = useState<OrderLineItem[]>([]);
    //const [newOrderId, setNewOrderId] = useState<number | undefined>(undefined)
    //const [newCustomerEmail, setNewCustomerEmail] = useState<string | undefined | null>(null)
    
    const orderLineItems = useAppSelector((state) => state.pos.products)
    
    const dispatch = useAppDispatch()
    
    console.log("OrderLineItems:", orderLineItems);
    
    useEffect(() => {
        dispatch(
            loadOrderLineItem(),
        );
    }, []);

    useEffect(() => {
        setClientOrderLineItems(orderLineItems || []);
    }, [orderLineItems]);

    const sumItems = useMemo(() => orderLineItems.reduce((sum, item) => sum + item.qty, 0), [clientOrderLineItems])
    const total = useMemo(() => orderLineItems.reduce((sum, item) => sum + item.price * item.qty, 0), [clientOrderLineItems])
    const taxRate = 7
    const taxFee = useMemo(() => (total * (taxRate / 100)).toFixed(2), [total, taxRate])

    
    const [searchResults, setSearchResults] = useState(products);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    
    
    let customerOptions = [] as CustomerOptionProps[] 
    if (!customers) {
        return <p>No customer Found</p>
    } else {
        customerOptions = customers?.map((item) => {
            return {
              value: item.id.toString(),
              label: item.name ?? "Unknown",
              email: item.email ?? "",
              phone: item.phone ?? "",
            }
          });
    }
    
    const initialCustomerId = 2;
    const initialCustomer = customerOptions?.find(
    (item) => Number(item.value) === initialCustomerId
    );
    const [selectedCustomer, setSelectedCustomer] = 
    useState<any>(initialCustomer);

    const handleAdd = (newOrderLineItems: ProductwithBrand) => {
        dispatch(
            addProductToOrderLine({
                id: newOrderLineItems.id,
                name: newOrderLineItems.name,
                brand: newOrderLineItems.brand.title,
                price: newOrderLineItems.productPrice,
                productThumbnail: newOrderLineItems.productThumbnail,
                qty: 1,
                stock: newOrderLineItems.stockQty,
            })
        );
    }
    const handleRemove = (orderItemId: number) => {
        dispatch(
            removeProductFromOrderLine(orderItemId)
        );
    }
    const handleIncrement = (orderItemId: number) => {
        dispatch(
            incrementQty(orderItemId)
        );
    }
    const handleDecrement = (orderItemId: number) => {
        dispatch(
            decrementQty(orderItemId)
        );
    }
    const clearAll = () => {
        dispatch(
            removeProductsfromLocalStorage()
        )
        setSuccess(false);
    }
    
    const contentRef = React.useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        }
    )

    const handleCreateOrder = async () => {

        setProcessing(true);
        const customerData = {
            customerId: Number(selectedCustomer.value),
            customerName: selectedCustomer.label as string,
            customerEmail: selectedCustomer.email as string,
            customerPhone: selectedCustomer.phone as string,
        }
        
        const orderItems = orderLineItems.map((lineItem) => {
            return {
                id: lineItem.id,
                name: lineItem.name,
                brand: lineItem.brand,
                price: lineItem.price,
                qty: lineItem.qty,
                productThumbnail: lineItem.productThumbnail,
            }
        })
        
        const orderAmount = total
        const newOrder = {
            orderItems: orderLineItems,
            orderAmount,
            orderType: "Sale",
            source: "pos"
        }
       
        if (!customerData || !orderItems || !orderAmount) {
            toast.error("Incomplete order data, please fill out all required fields.");
            setProcessing(false);
            return;
        }

        try {
            const res = await createLineOrder(newOrder, customerData)
            const data = res.data
            console.log("Order created", data);
            
            if (res.success) {                
                const newOrderId = data?.id;
                const newCustomerEmail = data?.customerEmail;

                // setNewOrderId(newOrderId)
                // setNewCustomerEmail(newCustomerEmail)
                setSuccess(true);
                setProcessing(false);
                // Wait for state updates to complete and content to render
                await new Promise(resolve => setTimeout(resolve, 1000)); 

                if (newOrderId && newCustomerEmail)

                await handleSaveReceiptWithRetry(newOrderId, newCustomerEmail);
                
            }
            
        } catch (error) {
            console.log("Error creating order", error);
            setProcessing(false);
        } 
    }

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
                    throw new Error("❌ Print failed");
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
            console.error("❌ Failed to save receipt:", response.data.error);
        }

        } catch (error) {
            console.error("Error capturing image:", error);
        }
        
    };

  return (

    <div className="grid grid-cols-12 divide-x-2 
        divide-gray-200 min-h-screen">
            <div className='col-span-full md:col-span-9 px-3'>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className='space-x-1 items-center flex mt-1'>
                        <Button 
                            variant={"outline"} 
                            size={"sm"} 
                            asChild 
                            className={cn('py-2 px-2', 
                            cate === `all` ? "bg-slate-400" : "")}
                        >
                            <Link href={`/pos?cate=all`} className='flex gap-2'>
                                <Image 
                                    src={"/StockOnline.png"}
                                    alt='category'
                                    width={200}
                                    height={200}
                                    className='size-6 rounded-full'
                                />
                                <h3 className='text-sm font-medium truncate'>All</h3>
                            </Link>
                        </Button>
                        {categories && categories.map((c, index) => {
                            return (
                                <Button 
                                    key={index} 
                                    variant={"outline"} 
                                    size={"sm"} 
                                    asChild
                                    className={cn('py-2 px-2', 
                                    cate === `${c.id}` ? "bg-slate-400" : "")}
                                >
                                    <Link href={`/pos?cate=${c.id}`} className='flex gap-2'>
                                        {/* <Image 
                                            src={category?.imageUrl ?? "/placeholder.svg"}
                                            alt='category'
                                            width={200}
                                            height={200}
                                            className='size-6 rounded-full'
                                        /> */}
                                        <h3 className='text-sm font-medium truncate'>{c.title}</h3>
                                    </Link>
                                </Button>
                            )
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className='px-2 pt-2'>
                    {products && products.length > 0 ? (
                        <div>
                            <div className='grid grid-cols-3 items-center gap-3'>
                                <SearchItems 
                                    allProducts={products as ProductwithBrand[]} 
                                    onSearch={setSearchResults} 
                                />
                                <FormSelectInput
                                    label="Customer"
                                    options={customerOptions}
                                    option={selectedCustomer}
                                    setOption={setSelectedCustomer}
                                    toolTipText='Add new customer'
                                    labelShown={false}
                                    href={"/dashboard/sales/customers/new"}
                                />
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                {searchResults?.map((product,index) => {
                                    return (
                                        <div key={index}>
                                            {product.stockQty > 0 && (
                                                <ItemCard  
                                                    product={product}
                                                    handleAdd={handleAdd}
                                                    handleRemove={handleRemove}
                                                />
                                            )}
                                        </div>
                                        
                                    )
                                })}  
                            </div>
                        </div>
                    ) : (
                        <div className='text-sm text-center'>No products found</div>
                    )}
                </div>
            </div>
            <div className='col-span-full md:col-span-3 p-3'>
                {clientOrderLineItems && clientOrderLineItems.length > 0 && (
                    <div className='flex items-center justify-between'>
                        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                            Order Item
                        </h2>
                        <button 
                            type="button" 
                            onClick={clearAll} 
                            className='border shadow-sm px-2 py-2 rounded text-muted-foreground active:scale-90'
                        >
                            Clear
                        </button>
                    </div>
                )}
                {
                    clientOrderLineItems && clientOrderLineItems.length > 0 ? (
                        <div>
                            {orderLineItems.map((item, index) => {
                                return (
                                    <OrderCard 
                                        key={index} 
                                        product={item}
                                        handleIncrement={handleIncrement}
                                        handleDecrement={handleDecrement}
                                        handleRemove={handleRemove}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <div className='text-base text-center py-6'>Your cart is empty</div>
                    )
                }
                {
                    clientOrderLineItems && clientOrderLineItems.length > 0 ? (
                        <div className='mt-2'>
                            <h2 className="scroll-m-20 border-b pb-2 text-2xl 
                            font-semibold tracking-tight first:mt-0"
                            >
                                Order Summary
                            </h2>
                            <div className='py-2 border-b'>
                                <div className='flex justify-between'>
                                    <h3 className='text-muted-foreground'>Total Items:</h3>
                                    <h3 className=' font-medium text-muted-foreground'>{sumItems} items</h3>
                                </div>
                                <div className='flex justify-between'>
                                    <h3 className='text-muted-foreground'>Total:</h3>
                                    <h3 className='font-medium text-muted-foreground'>$ {total.toLocaleString("en-us")}</h3>
                                </div>
                                <div className='flex justify-between'>
                                    <h3 className='text-muted-foreground'>Tax:able {taxRate}%</h3>
                                    <h3 className='font-medium text-muted-foreground'>$ {taxFee}</h3>
                                </div>
                            </div>
                            <div className='py-2 flex justify-between items-end'>
                                <h2 className="scroll-m-20 text-2xl text-muted-foreground 
                                font-semibold tracking-tight first:mt-0"
                                >
                                    Total
                                </h2>
                                <h3 className="scroll-m-20 text-xl text-muted-foreground 
                                font-semibold tracking-tight first:mt-0"
                                >
                                    $ {total}
                                </h3>
                            </div>
                            <div className='w-full py-4'>
                                {processing ? (
                                    <Button 
                                        variant={"shop"} 
                                        size={"sm"} 
                                        className='w-full'
                                        disabled
                                    >
                                        <Loader className='size-4 animate-spin' />
                                        Processing...
                                    </Button>
                                ) : (
                                    <Button 
                                        variant={"shop"} 
                                        size={"sm"} 
                                        className='w-full'
                                        onClick={handleCreateOrder}
                                    >   
                                        <ShoppingBasket className='size-4'/>
                                        Place an Order
                                    </Button>
                                )}
                                <div className='pt-4'>
                                    <ReceiptPrint 
                                        contentRef={contentRef} 
                                        handlePrint={handlePrint}
                                        success={success}
                                        setSuccess={setSuccess}
                                        clearAll={clearAll} 
                                    />
                                </div>
                            </div>
                        </div>
                ) : ("")}
            </div>
    </div>

  )
}

export default PointOfSale