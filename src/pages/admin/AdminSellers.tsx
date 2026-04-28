import { useState } from "react";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import API from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

export default function AdminSellers() {
  const [sellerList, setSellerList] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const filtered = sellerList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (id: string, status: string) => {
  try {
    await API.post(`/admin/sellers/${id}/status`, { status });

    toast.success("Updated");

    fetchSellers();
  } catch (err) {
    toast.error("Failed");
  }
};

const deleteSeller = async (id: string) => {
  try {
    await API.delete(`/admin/sellers/${id}`);

    toast.success("Seller deleted");

    fetchSellers(); // refresh list
  } catch (err) {
    console.error(err);
    toast.error("Delete failed");
  }
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
  fetchSellers();
}, []);

const fetchSellers = async () => {
  try {
    const res = await API.get("/admin/sellers");

    console.log("SELLERS:", res.data);

    setSellerList(res.data.data);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Sellers</h1>
        <p className="text-muted-foreground">Manage marketplace sellers</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>All Sellers ({filtered.length})</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search sellers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seller</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={seller.avatar} alt={seller.name} className="h-8 w-8 rounded-full" />
                      <div>
                        <p className="font-medium text-foreground">{seller.name}</p>
                        <p className="text-xs text-muted-foreground">{seller.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{seller.totalProducts}</TableCell>
                  <TableCell>{seller.totalSales}</TableCell>
                  <TableCell>Rs.{Number(seller.revenue || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={statusColor(seller.status) as any} className="capitalize">{seller.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{seller.joinedAt || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {seller.status !== "active" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" onClick={() => updateStatus(seller.id, "active")}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {seller.status !== "suspended" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => deleteSeller(seller.id)}
                        >
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
    </div>
  );
}
