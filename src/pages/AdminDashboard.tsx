import { Users, Package, DollarSign, Store, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/StatsCard";
import { useEffect } from "react";
import API from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [sellerList, setSellerList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);

  const totalRevenue = sellerList.reduce((s, sl) => s + sl.revenue, 0);
  const totalSales = sellerList.reduce((s, sl) => s + sl.totalSales, 0);

  const updateStatus = (id: string, status: "active" | "suspended") => {
    setSellerList((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    toast.success(`Seller ${status === "active" ? "activated" : "suspended"}`);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "pending": return "secondary";
      case "suspended": return "destructive";
      default: return "secondary";
    }
  };

  useEffect(() => {
  fetchDashboardData();
}, []);

const fetchDashboardData = async () => {
  try {
    const res = await API.get("/admin/dashboard");

    console.log("ADMIN DATA:", res.data);

    setSellerList(res.data.data.sellers)
setProductList(res.data.data.products)


  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="text-muted-foreground">Manage your marketplace</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Sellers" value={sellerList.length} icon={Store} trend="+1 this month" />
        <StatsCard title="Total Products" value={productList.length} icon={Package} />
        <StatsCard title="Total Sales" value={totalSales} icon={Users} trend="+18% this month" />
        <StatsCard title="Revenue" value={`₹{totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+12% this month" />
      </div>

      <Tabs defaultValue="sellers" className="mt-8">
        <TabsList>
          <TabsTrigger value="sellers">Sellers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="sellers">
          <Card>
            <CardHeader><CardTitle>All Sellers</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seller</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellerList.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={seller.avatar} alt={seller.name} className="h-8 w-8 rounded-full" />
                          <div>
                            <p className="font-medium">{seller.name}</p>
                            <p className="text-xs text-muted-foreground">{seller.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{seller.totalProducts}</TableCell>
                      <TableCell>{seller.totalSales}</TableCell>
                      <TableCell>₹{seller.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={statusColor(seller.status) as any}>{seller.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {seller.status !== "active" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-success" onClick={() => updateStatus(seller.id, "active")}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {seller.status !== "suspended" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => updateStatus(seller.id, "suspended")}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader><CardTitle>All Products</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productList.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.sellerName}</TableCell>
                      <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>⭐ {product.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
