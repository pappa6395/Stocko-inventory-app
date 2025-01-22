
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Bell, Delete, Home, LineChart, Package, Package2, Search, ShoppingCart, Trash, Users } from 'lucide-react'

const TransactionList = () => {

  return (

    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 
    md:p-6 border shadow-sm rounded-lg">
        <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Products</h1>
            <Button className="ml-auto" size="sm">
                Add product
            </Button>
        </div>
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Inventory</TableHead>
                        <TableHead />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">
                            <p className='text-xs'>Glimmer Lamps</p>
                            <p className='text-xs text-muted-foreground'>
                                gilmmer@example.com
                            </p>
                        </TableCell>
                        <TableCell>Elegant and stylish lamps for your home</TableCell>
                        <TableCell>$99.99</TableCell>
                        <TableCell>500 in stock</TableCell>
                        <TableCell>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Delete className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="icon">
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </main>

  )
}

export default TransactionList