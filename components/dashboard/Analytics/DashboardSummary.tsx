
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, File, ListFilter } from "lucide-react"
import BarChartCard from "./BarChartCard"
import RecentSaleCard from "../RecentSaleCard"
import OrderSummary from "../OrderSummary"
import { getOrders } from "@/actions/pos"
import { convertIsoToDateString } from "@/lib/convertISOtoDate"
import Link from "next/link"

export default async function DashboardSummary() {

    const orders = (await getOrders()).data || [];

  return (

    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <Tabs defaultValue="orders">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                        <TabsTrigger value="sales">Recent Sales</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                </div>
                </div>
                <TabsContent value="orders">
                    <OrderSummary orders={orders} />
                    <Card x-chunk="dashboard-05-chunk-3" className="mt-2 pt-2">
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
                            { orders && orders.length > 0 ? (
                                orders.map((order,index) => {
                                    const date = convertIsoToDateString(order.createdAt)
                                    const isEven = index % 2 === 0;
                                    return (
                                        <TableRow key={index} className={isEven ? "bg-accent" : ""}>
                                            <TableCell>
                                            <div className="font-medium">{order.customerName}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">{order.customerEmail}</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">{order.orderType}</TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                            {/* <Badge className="text-xs" variant="secondary">
                                                {order.status}
                                            </Badge> */}
                                            {order.status === "DELIVERED" ? (
                                                <button className="py-1.5 px-3 bg-emerald-400 
                                                rounded-full font-semibold dark:text-slate-100">{order.status}</button>
                                            ) : order.status === "PROCESSING" ? (
                                                <button className="py-1.5 px-3 bg-sky-400 
                                                rounded-full">{order.status}</button>
                                            ) : order.status === "PENDING" ? (
                                                <button className="py-1.5 px-3 bg-amber-400 
                                                rounded-full">{order.status}</button>
                                            ) : order.status === "SHIPPED" ? (
                                                <button className="py-1.5 px-3 bg-emerald-400 
                                                rounded-full">{order.status}</button>
                                            ) : (<button className="py-1.5 px-3 bg-red-400 
                                                rounded-full">{order.status}</button>)}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{date}</TableCell>
                                            <TableCell className="text-right">${order.orderAmount}</TableCell>
                                            <TableCell className="text-right">
                                                <Button 
                                                    asChild 
                                                    size="sm" 
                                                    variant="outline" 
                                                    className="gap-1 text-sm">
                                                    <Link href="#" >
                                                        <File className="h-3.5 w-3.5" />
                                                        <span className="sr-only sm:not-sr-only">View</span>
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6}>No orders found.</TableCell>
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="month">
                    <RecentSaleCard />
                </TabsContent>
                <TabsContent value="year">
                    <BarChartCard />
                </TabsContent>
            </Tabs>
        </div>
    </main>

  )
}
