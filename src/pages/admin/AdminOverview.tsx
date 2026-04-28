import { Users, Package, DollarSign, Store } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function AdminOverview() {

    const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [sellers, setSellers] = useState<any[]>([]);

  useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const res = await API.get("/admin/dashboard");

    console.log("DASHBOARD:", res.data);

    const data = res.data.data;

    setStats(data.stats);
    setOrders(data.recentOrders);
    setSellers(data.topSellers);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
      <p className="text-muted-foreground mb-6">Welcome to the admin panel</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Sellers" value={stats?.totalSellers || 0} icon={Store} />
        <StatsCard title="Total Products" value={stats?.totalProducts || 0} icon={Package} />
        <StatsCard title="Total Orders" value={stats?.totalOrders || 0} icon={Users} />
        <StatsCard title="Revenue" value={`${stats?.revenue || 0}`} icon={DollarSign} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.buyerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">Rs.{order.totalAmount}</p>
                    <p className="text-xs capitalize text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top Sellers</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sellers.sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((seller) => (
                <div key={seller.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <img src={seller.avatar} alt={seller.name} className="h-8 w-8 rounded-full" />
                    <div>
                      <p className="font-medium text-foreground">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">{seller.totalProducts} products</p>
                    </div>
                  </div>
                  <p className="font-semibold text-foreground">Rs.{seller.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
