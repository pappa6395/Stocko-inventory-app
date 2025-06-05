
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ArrowUpRight, ExternalLink, File, ListFilter } from "lucide-react"
import BarChartCard from "./BarChartCard"
import OrderSummary from "../OrderSummary"
import { getOrders } from "@/actions/pos"
import { convertIsoToDateString } from "@/lib/convertISOtoDate"
import Link from "next/link"
import { getCustomers } from "@/actions/orders"
import DataTable from "../Table/dataTableComponents/DataTable"
import { columns } from "@/app/(back-office)/dashboard/sales/customers/columns"
import { getBestSellingProducts } from "@/actions/products"
import BestSellingProducts from "../BestSellingProducts"

export default async function DashboardSummary() {

    const orders = (await getOrders()).data || [];
    const bestSellingProducts = (await getBestSellingProducts(5)).data || [];
    const customers = (await getCustomers()).data || [];

  return (

    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <Tabs defaultValue="orders">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                        <TabsTrigger value="sales">Recent Sales</TabsTrigger>
                        <TabsTrigger value="customers">Recent Customers</TabsTrigger>
                        <TabsTrigger value="bestSales">Best Selling</TabsTrigger>
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
                </TabsContent>
                <TabsContent value="sales">
                    <BestSellingProducts products={bestSellingProducts}/>
                </TabsContent>
                <TabsContent value="customers">
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 
                        md:p-6 border shadow-sm rounded-lg">
                        <div className="flex items-center">
                            <h1 className="font-semibold text-lg md:text-2xl">Recent Customers</h1>
                            <Button asChild className="ml-auto" size="sm">
                                <Link href={`/dashboard/sales/customers`}>
                                    <span>View All</span>
                                    <ExternalLink />
                                </Link>
                            </Button>
                        </div>
                        <div>
                            <DataTable columns={columns} data={customers.slice(0,5)} />
                        </div>
                    </main>  
                    {/* <BarChartCard /> */}
                </TabsContent>
                <TabsContent value="bestSales">
                    <BestSellingProducts products={bestSellingProducts}/>
                </TabsContent>
                <TabsContent value="year">
                    <BestSellingProducts products={bestSellingProducts}/>
                </TabsContent>
            </Tabs>
        </div>
    </main>

  )
}
