"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

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

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export default function ReceiptPrint() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="receipt" className="w-full">Print Receipt</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">Stocko Online</DrawerTitle>
            <div>
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
                    {new Date().toLocaleDateString("en-US")}
                  </p>
                  <p className="text-gray-500">
                    {new Date().toLocaleTimeString("en-US")}
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
                        <div className="text-gray-700 col-span-7">Handbag</div>
                        <div className="flex col-span-5 justify-between">
                            <div className="text-gray-500">1</div>
                            <div className="text-gray-500">$120</div>   
                        </div>
                        <div className="text-gray-700 col-span-7">Wallet</div>
                        <div className="flex col-span-5 justify-between">
                            <div className="text-gray-500">1</div>
                            <div className="text-gray-500">$50</div>   
                        </div>
                        <div className="text-gray-700 col-span-7">iPhone 16 (128GB)</div>
                        <div className="flex col-span-5 justify-between">
                            <div className="text-gray-500">1</div>
                            <div className="text-gray-500">$990</div>   
                        </div>
                    </div>
                </div>
                <div className="col-span-full border-dashed border-b border-gray-800"/>
                <div>
                    <div className="flex items-center px-2 justify-between space-x-2 text-sm">
                      <div className="text-gray-700">Total:</div>
                      <div className="text-gray-500">$1,160.00</div>
                    </div>
                    <div className="col-span-full border-dashed border-b border-gray-800"/>
                    <div className="flex items-center px-2 justify-between space-x-2 text-sm">
                        <div className="text-gray-700">QRPayment</div>
                        <div className="text-gray-500">$1,160.00</div>
                    </div>
                    <div className="flex items-center px-2 space-x-2 text-sm">
                        <div className="text-gray-700">PROMPTPAY ID:</div>
                        <div className="text-gray-500">12345ABCDE</div>
                    </div>
                    <div className="col-span-full border-dashed border-b border-gray-800"/>
                    <div className="flex items-center px-2 justify-between space-x-2 text-sm">
                        <div className="text-gray-700">VATable:</div>
                        <div className="text-gray-500">$1,160.00</div>
                    </div>
                    <div className="flex items-center px-2 justify-between space-x-2 text-sm">
                        <div className="text-gray-700">VAT:7.00%</div>
                        <div className="text-gray-500">$81.20</div>
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
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
