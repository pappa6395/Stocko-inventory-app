"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useAppSelector } from "@/redux/hooks/hooks"
import { OrderLineItem } from "@/redux/slices/pointOfSale"
import { useReactToPrint } from "react-to-print"
import { getCurrentDateAndTime } from "@/lib/getCurrentDateTime"


export default function ReceiptPrint() {

  const [clientOrderLineItems, setClientOrderLineItems] = React.useState<OrderLineItem[]>([]);
  const orderLineItems = useAppSelector((state) => state.pos.products)

  const sumItems = React.useMemo(() => orderLineItems.reduce((sum, item) => sum + item.qty, 0), [clientOrderLineItems])
  const total = React.useMemo(() => orderLineItems.reduce((sum, item) => sum + item.price * item.qty, 0), [clientOrderLineItems])
  const taxRate = 7
  const taxFee = React.useMemo(() => (total * (taxRate / 100)).toFixed(2), [total, taxRate])
  //const total = React.useMemo(() => (subTotal + Number(taxFee)).toFixed(2), [subTotal, taxFee])
  const totals = total.toLocaleString("en-US")

  const contentRef = React.useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
  })
  const { currentDate, currentTime} = getCurrentDateAndTime()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="receipt" className="w-full">Print Receipt</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div ref={contentRef} >
                <DrawerTitle className="text-center mt-2 pt-2">Stocko Online</DrawerTitle>
                <div className="flex flex-col items-center space-x-2 text-sm">
                    <p className="text-gray-700">Receipt / Tax INVOICE (ABB)</p>
                    <p className="text-gray-700">Stoko online market trading Company Branch No.024</p>
                    <p className="text-gray-700">(Bangkok - Lasalle)</p>
                    <p className="text-gray-700">TAX ID: 0987654321</p>
                    <p className="text-gray-700">POS ID: ABC0987654321</p>
                </div>
                <div className="flex items-center pt-2 px-2 space-x-2 text-sm">
                  <p className="text-gray-700">Date:</p>
                  <p className="text-gray-500">
                    {currentDate}
                  </p>
                  <p className="text-gray-500">
                    {currentTime}
                  </p>
                </div>
                <div className="flex items-center px-2 space-x-2 text-sm">
                  <div className="text-gray-700">Order ID:</div>
                  <div className="text-gray-500">123456789</div>
                </div>
                <div>
                    <div className="flex items-center px-2 space-x-2 text-sm">
                      <div className="text-gray-700">Tax Invoice No.</div>
                      <div className="text-gray-500">1234567890ABCDE</div>
                    </div>
                    <div className="flex items-center px-2 space-x-2 text-sm">
                      <div className="text-gray-700">Cashier ID:</div>
                      <div className="text-gray-500">54321</div>
                      <div className="text-gray-500 divide-x-2">John Doe</div>
                    </div>
                </div>
                <div>
                    <div className="border-dashed border-b border-gray-800"/>
                    <div className="grid grid-cols-12 items-center px-2 justify-between text-sm">
                        <div className="text-gray-500 col-span-7">Item Name</div>
                        <div className="flex col-span-5 justify-between">
                            <div className="text-gray-500">Qty</div>
                            <div className="text-gray-500">Price</div>
                        </div>  
                    </div>
                    <div className="col-span-full border-dashed border-b border-gray-800"/>
                    <div className="grid grid-cols-12 items-center px-2 justify-between text-sm">
                        {orderLineItems?.map((item,index) => {
                          return (
                            <React.Fragment key={index}>
                              <div className="text-gray-700 col-span-7">{item.name}</div>
                              <div className="flex col-span-5 justify-between">
                                  <div className="text-gray-500">{item.qty}</div>
                                  <div className="text-gray-500">${item.price.toLocaleString("en-US")}</div>   
                              </div>
                            </React.Fragment>
                          )
                        })}
                    </div>
                </div>
                <div className="col-span-full border-dashed border-b border-gray-800"/>
                <div>
                    <div className="flex items-center px-2 justify-between space-x-2 text-sm">
                      <div className="text-gray-700">Total:</div>
                      <div className="text-gray-500">${totals}</div>
                    </div>
                    <div className="col-span-full border-dashed border-b border-gray-800"/>
                    <div className="flex items-center px-2 justify-between space-x-2 text-sm">
                        <div className="text-gray-700">QRPayment</div>
                        <div className="text-gray-500">${totals}</div>
                    </div>
                    <div className="flex items-center px-2 space-x-2 text-sm">
                        <div className="text-gray-700">PROMPTPAY ID:</div>
                        <div className="text-gray-500">12345ABCDE</div>
                    </div>
                    <div className="col-span-full border-dashed border-b border-gray-800"/>
                    <div className="flex items-center px-2 justify-between space-x-2 text-sm">
                        <div className="text-gray-700">VATable:</div>
                        <div className="text-gray-500">${totals}</div>
                    </div>
                    <div className="flex items-center px-2 justify-between space-x-2 text-sm">
                        <div className="text-gray-700">VAT:{taxRate.toFixed(2)}%</div>
                        <div className="text-gray-500">${taxFee}</div>
                    </div>
                </div>
                <div className="col-span-full border-dashed border-b border-gray-800"/>
                <div>
                    <div className="flex items-center px-2 space-x-2 text-sm">
                      <div className="text-gray-700">Customer:</div>
                      <div className="text-gray-500">Pap Nontachai</div>
                      <div className="text-gray-500">(member)</div>
                    </div>
                    <div className="flex items-center px-2 space-x-2 text-sm">
                      <div className="text-gray-700">Card ID:</div>
                      <div className="text-gray-500">XXXX XXXX 7899 1599</div>
                    </div>
                </div>
                <div className="col-span-full border-dashed border-b border-gray-800"/>
                <div>
                    <div className="flex items-center justify-center px-2 space-x-2 text-sm">
                      <div className="text-gray-700">Contact Center:</div>
                      <div className="text-gray-500">+(66) 2-789-4562</div>
                    </div>
                    <div className="col-span-full border-dashed border-b border-gray-800"/>
                    <div className="flex items-center justify-center px-2 space-x-2 text-sm">
                      <div className="text-gray-700">Including VAT.</div>
                    </div>
                    <div className="flex items-center justify-center px-2 space-x-2 text-sm">
                      <div className="text-gray-700">Thank You For Shopping with us</div>
                    </div>
                    <div className="flex items-center justify-center px-2 space-x-2 text-sm">
                      <div className="text-gray-700">Stocko Online...Just the Right Thing</div>
                    </div>
                </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button type="button" onClick={() => handlePrint()}>Print Receipt</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
