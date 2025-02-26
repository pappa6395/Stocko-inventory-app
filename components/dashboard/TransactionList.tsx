
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ArrowUpRight, Bell, Delete, File, Home, LineChart, Package, Package2, Search, ShoppingCart, Trash, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const TransactionList = () => {

  return (

    <Card className="mt-2 pt-2">
        <CardHeader className="px-7">
            <div className="flex justify-between items-center">
                <CardTitle className="text-3xl">Recent Orders</CardTitle>
                <Button 
                    asChild 
                    size="lg" 
                    variant="default" 
                    className="gap-1 text-sm py-2.5 px-3">
                    <Link href="#" >
                        <span className="sr-only sm:not-sr-only">View All</span>
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>  
            <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={6}>No orders found.</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </CardContent>
    </Card>

  )
}

export default TransactionList