"use server"

import { prismaClient } from "@/lib/db";
import { eachDayOfInterval, format, startOfMonth, subDays, subMonths } from "date-fns";
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

export interface DailySales {
    day: string;
    sales: number;
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

export const getSalesCountForPastSevenDaysOld = async (): Promise<
  DailySales[]
> => {
  const now = new Date();
  const sevenDaysAgo = subDays(now, 7);

  const sales = await prismaClient.sale.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
        lte: now,
      },
    },
    select: {
      createdAt: true,
    },
  });

  // Create a map to store sales counts per day
  const salesCountMap: { [key: string]: number } = {};

  sales.forEach((sale) => {
    const day = format(sale.createdAt, "EEE do MMM");
    salesCountMap[day] = (salesCountMap[day] || 0) + 1;
  });

  // Transform the map into the desired array format
  const salesCountArray: DailySales[] = Object.entries(salesCountMap).map(
    ([day, sales]) => ({
      day,
      sales,
    })
  );

  return salesCountArray;
};

export const getSalesCountForPastSevenDays = async (): Promise<
  DailySales[]
> => {
  const now = new Date();
  const sevenDaysAgo = subDays(now, 6); // Start from six days ago to include today

  // Get all dates for the past 7 days
  const days = eachDayOfInterval({
    start: sevenDaysAgo,
    end: now,
  });

  // Initialize sales count map with 0 sales for each day
  const salesCountMap: { [key: string]: number } = {};
  days.forEach((day) => {
    const formattedDay = format(day, "EEE do MMM");
    salesCountMap[formattedDay] = 0;
  });

  // Fetch sales data for the past 7 days
  const sales = await prismaClient.sale.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
        lte: now,
      },
    },
    select: {
      createdAt: true,
    },
  });

  // Update sales count map with actual sales data
  sales.forEach((sale) => {
    const formattedDay = format(sale.createdAt, "EEE do MMM");
    salesCountMap[formattedDay] += 1;
  });

  // Transform the map into the desired array format
  const salesCountArray: DailySales[] = days.map((day) => {
    const formattedDay = format(day, "EEE do MMM");
    return {
      day: formattedDay,
      sales: salesCountMap[formattedDay],
    };
  });

  return salesCountArray;
};

export interface MainCategorySales {
    title: string;
    sales: number;
  }
  export interface MainCategoryRevenue {
    title: string;
    revenue: number;
  }

export const getRevenueByMainCategory = async (): Promise<
  MainCategoryRevenue[]
> => {
  // Fetch all main categories
  const mainCategories = await prismaClient.mainCategory.findMany({
    include: {
      categories: {
        include: {
          subCategories: {
            include: {
              products: {
                include: {
                  sale: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Aggregate revenue by main category
  const mainCategoryRevenue: MainCategoryRevenue[] = mainCategories.map(
    (mainCategory) => {
      let totalRevenue = 0;

      mainCategory.categories.forEach((category) => {
        category.subCategories.forEach((subCategory) => {
          subCategory.products.forEach((product) => {
            product.sale.forEach((sale) => {
              totalRevenue += sale.salePrice;
            });
          });
        });
      });

      return {
        title: mainCategory.title,
        revenue: totalRevenue,
      };
    }
  );

  return mainCategoryRevenue;
};

export interface MonthlyMainCategoryRevenue {
    month: string;
    [category: string]: number | string;
}
const getFirstWord = (str: string) => str.split(" ")[0];

export const getRevenueByMainCategoryPastSixMonths = async (): Promise<
MonthlyMainCategoryRevenue[]
> => {
// Calculate the start date for the 6-month period
const sixMonthsAgo = subMonths(new Date(), 5); // Include the current month
const startOfSixMonthsAgo = startOfMonth(sixMonthsAgo);

// Fetch all main categories with sales within the last 6 months
const mainCategories = await prismaClient.mainCategory.findMany({
    include: {
    categories: {
        include: {
        subCategories: {
            include: {
            products: {
                include: {
                sale: {
                    where: {
                    createdAt: {
                        gte: startOfSixMonthsAgo,
                    },
                    },
                },
                },
            },
            },
        },
        },
    },
    },
});

// Initialize a map to store monthly revenue for each main category
const monthlyRevenueMap: { [month: string]: MonthlyMainCategoryRevenue } = {};

// Populate the map with months and categories
for (let i = 0; i < 6; i++) {
    const date = subMonths(new Date(), i);
    const month = format(date, "MMMM");

    if (!monthlyRevenueMap[month]) {
    monthlyRevenueMap[month] = { month };
    }

    mainCategories.forEach((mainCategory) => {
    const categoryKey = getFirstWord(mainCategory.title);
    if (!(categoryKey in monthlyRevenueMap[month])) {
        monthlyRevenueMap[month][categoryKey] = 0;
    }
    });
}

// Aggregate revenue by month and main category
mainCategories.forEach((mainCategory) => {
    const categoryKey = getFirstWord(mainCategory.title);
        mainCategory.categories.forEach((category) => {
            category.subCategories.forEach((subCategory) => {
                subCategory.products.forEach((product) => {
                    product.sale.forEach((sale) => {
                        const saleMonth = format(sale.createdAt, "MMMM");
                        if (monthlyRevenueMap[saleMonth]) {
                            monthlyRevenueMap[saleMonth][categoryKey] =
                            (monthlyRevenueMap[saleMonth][categoryKey] as number) +
                            sale.salePrice;
                        }
                    });
                });
            });
        });
    }
);

// Convert the map to an array and ensure it conforms to MonthlyMainCategoryRevenue[]
const mainCategoryRevenueArray: MonthlyMainCategoryRevenue[] =
    Object.values(monthlyRevenueMap).reverse(); // Reverse to have the months in ascending order

return mainCategoryRevenueArray;
};
