"use client";
import { DashboardMetrics } from "../../../components/dashboard/dashboard-metrics";
import { DashboardCharts } from "../../../components/dashboard/dashboard-charts";
import { RecentOrders } from "../../../components/dashboard/recent-orders";
import { TopProducts } from "../../../components/dashboard/top-products";

export default function Dashboard() {
  return (
    <main className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Wolde!</h2>
        <p className="text-gray-500">
          Here's what's happening with your store today.
        </p>
      </div>

      <DashboardMetrics />
      <DashboardCharts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>
    </main>
  );
}
