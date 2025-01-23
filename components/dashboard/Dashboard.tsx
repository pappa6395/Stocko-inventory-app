
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import AnalyticCard from "./Analytics/AnalyticCard";
import Analytics from "./Analytics/Analytics";
import RecentSaleCard from "./RecentSaleCard";
import TransactionList from "./TransactionList";


export default function Dashboard() {
  return (
        <main>
          <section className="container py-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <AnalyticCard />
              <AnalyticCard />
              <AnalyticCard />
              <AnalyticCard />
            </div>
          </section>
          <section className="container py-2">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-8">
              <div className="col-span-full">
                <Analytics />
              </div>
              <div className="col-span-full">
                <TransactionList />
              </div>
            </div>
          </section>
        </main>
  );
}