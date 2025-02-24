"use server"

import { prismaClient } from "@/lib/db";
import { 
    ChartColumnIncreasing, 
    ChartNoAxesCombined, 
    DollarSign, 
    LucideProps, 
    ReceiptText, 
    Shirt, 
    ShoppingBag, 
    SquareChartGantt, 
    Store
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Sale {
    salePrice: number;
    qty: number;
}
interface SaleSummaryProps {
    saleCount: number;
    totalRevenue: number;
    totalItemsSold: number;
}
export interface AnalyticsProps {
    title: string;
    salesCount: number | undefined;
    detailLink: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    unit: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

function calculateSalesSummary(sales: Sale[]): SaleSummaryProps {
    const summary = sales.reduce((acc, sale) => {
        acc.saleCount += sale.qty;
        acc.totalRevenue += sale.salePrice * sale.qty;
        acc.totalItemsSold += sale.qty;
        return acc;
    }, { saleCount: 0, totalRevenue: 0, totalItemsSold: 0 });

    return summary;
}
export async function getAnalytics() {
    // total sales
    // total revenue
    // total orders

    try {
        const totalSales = await prismaClient.sale.findMany({
            select: {
                salePrice: true,
                qty: true,
            }
        });
        const saleSummary = calculateSalesSummary(totalSales);
        const ordersCount = await prismaClient.lineOrder.count();
        const productsCount = await prismaClient.products.count();
        const analytics = [
            {   
                title: "Sales",
                salesCount: saleSummary.saleCount,
                detailLink: "/dashboard/sales",
                icon: ChartColumnIncreasing,
                unit: ShoppingBag
            },
            {   
                title: "Total Revenue",
                salesCount: saleSummary.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                detailLink: "/dashboard/sales",
                icon: ChartNoAxesCombined,
                unit: DollarSign
            },
            {   
                title: "Total Orders",
                salesCount: ordersCount,
                detailLink: "/dashboard/sales/orders",  // should be orders page
                icon: SquareChartGantt,
                unit: ReceiptText
            },
            {   
                title: "Total Products",
                salesCount: productsCount,
                detailLink: "/dashboard/inventory/products",  // should be orders page
                icon: Store,
                unit: Shirt
            },
        ]
        return analytics as AnalyticsProps[]

    } catch (err) {
        console.error("Failed to create brand:",err);
        return null;
    }
}