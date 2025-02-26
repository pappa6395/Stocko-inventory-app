
import { AnalyticsProps, getRevenueByMainCategory, getRevenueByMainCategoryPastSixMonths, getSalesCountForPastSevenDays, getSalesCountForPastSevenDaysOld } from "@/actions/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import AnalyticCard from "./Analytics/AnalyticCard";
import RecentSaleCard from "./RecentSaleCard";
import TransactionList from "./TransactionList";
import DashboardSummary from "./Analytics/DashboardSummary";
import SalesChart from "./Analytics/SalesChart";
import RevenueByCategoryChart from "./Analytics/RevenueByCategoryChart";
import RevenueByCategory from "./Analytics/RevenueByCategory";


export default async  function Dashboard({analytics}: {analytics: AnalyticsProps[]}) {

  const sales = await getSalesCountForPastSevenDays() || [];
  const categoryRevenue = await getRevenueByMainCategory() || [];
  const categoryRevenueData = await getRevenueByMainCategoryPastSixMonths() || [];

  return (
        <main>
          <section className="container py-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {
                analytics.map((data, index) => {
                  return (
                    <div key={index} className="">
                        <AnalyticCard data={data} />
                    </div>
                  )
                })
              }
            </div>
          </section>
          <section className="container py-2">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-8">
              <div className="col-span-2">
                <SalesChart sales={sales} />
              </div>
              <div className="col-span-2">
                <RevenueByCategoryChart categoryRevenue={categoryRevenue} />
              </div>
              <div className="col-span-4">
                <RevenueByCategory categoryRevenueData={categoryRevenueData} />
              </div>
              <div className="col-span-full">
                <DashboardSummary />
              </div>
            </div>
          </section>
        </main>
  );
}