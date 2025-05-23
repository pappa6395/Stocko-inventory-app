"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Minus, Plus, Trash } from "lucide-react";
import { getPurchaseOrderById } from "@/actions/purchases";
import { getNormalDate } from "@/lib/getNormalDate";
import PurchaseOrderStatus from "@/components/frontend/orders/PurchaseOrderStatus";
import { IPurchaseOrder } from "@/type/types";
import { useReactToPrint } from "react-to-print";


export default function PurchaseDetails({
  purchase,
}: {
  purchase: IPurchaseOrder | null | undefined;
}) {

    const contentRef = React.useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        }
    )

  const items = purchase?.items;
  const supplier = purchase?.supplier;
  const totalPrice =
    items?.reduce((acc, item) => acc + item.unitCost * item.quantity, 0) ?? 0;
  return (
    <div>
      <div className="flex justify-between items-center pb-4 border-b ">
        <h2>Purchase Details</h2>
        <Button onClick={() => handlePrint()} size={"sm"} variant={"outline"}>
          Download/Print
        </Button>
      </div>
      <div className="py-3 px-8" ref={contentRef}>
        <div className="py-3 ">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="">
              <h2 className="font-bold pb-3">Supplier Info</h2>
              <p className="text-sm">
                {supplier?.name} - {supplier?.companyName}
              </p>
              <p className="text-sm">{supplier?.email}</p>
              <p className="text-sm">{supplier?.phone}</p>
              <p className="text-sm text-wrap">
                {supplier?.address} - {supplier?.city}
              </p>
            </div>
            <div className="">
              <h2 className="font-bold pb-3">Company Info</h2>
              <p className="text-sm">Stocko-Online</p>
              <p className="text-sm">itsupply@gmail.com</p>
              <p className="text-sm">0987654321</p>
              <p className="text-sm">Bangna-Trad Road</p>
            </div>
            <div className="">
              <h2 className="font-bold pb-3">Purchase Info</h2>
              <p className="text-sm">Ref : {purchase?.refNo}</p>
              <div className="flex items-center space-x-2">
                <span className="mr-3 text-sm">Payment Status : </span>
                <PurchaseOrderStatus order={purchase as IPurchaseOrder} />
              </div>
              <p className="text-sm text-wrap">
                Purchase Date:{" "}
                {getNormalDate(purchase?.createdAt ?? new Date())}{" "}
              </p>
              <p className="text-sm">Discount : ${purchase?.discount}</p>
            </div>
          </div>
        </div>
        <div className="py-4">
          <h2 className="text-xl font-medium">Order Summary</h2>
          <div className="pt-4">
            <CardContent>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {/* <TableHead>Product Code</TableHead> */}
                      <TableHead>Name</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Unit Cost</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <>
                    {items && items.length > 0 ? (
                      <TableBody className="">
                        {items.map((item) => {
                          return (
                            <TableRow key={item.productId}>
                              <TableCell className="font-medium">
                                {item?.productName}
                              </TableCell>
                              <TableCell>{item.currentStock}</TableCell>
                              <TableCell>{item?.unitCost}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.subTotal}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    ) : (
                      <TableBody className="">
                        <h2>No Products</h2>
                      </TableBody>
                    )}
                  </>
                </Table>
                <div className="w-full flex items-end justify-end ">
                  <div className="max-w-[200px]  ">
                    <Table>
                      {/* <TableHeader>
                  <TableRow>
                  
                    <TableHead>Item</TableHead>
                    <TableHead >
                      Value
                    </TableHead>
                  </TableRow>
                </TableHeader> */}
                      <TableBody className="">
                        <TableRow>
                          <TableCell className="font-medium">
                            Order Tax :{" "}
                          </TableCell>
                          <TableCell>${purchase?.tax}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Discount :{" "}
                          </TableCell>
                          <TableCell>${purchase?.discount}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Shipping :{" "}
                          </TableCell>
                          <TableCell>${purchase?.shippingCost}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold">Total : </TableCell>
                          <TableCell>${totalPrice.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold">Paid : </TableCell>
                          <TableCell>
                            ${totalPrice - purchase!.balanceAmount}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold">
                            Balance :{" "}
                          </TableCell>
                          <TableCell>${purchase!.balanceAmount}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}
