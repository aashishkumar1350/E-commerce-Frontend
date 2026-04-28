import { useState } from "react";
import { useEffect } from "react";
import API from "@/lib/api";
import { Package, DollarSign, ShoppingCart, TrendingUp, Plus, Edit, Trash2, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/StatsCard";
import { toast } from "sonner";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

const statusConfig: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pending", variant: "secondary" },
  confirmed: { label: "Confirmed", variant: "outline" },
  processing: { label: "Processing", variant: "outline" },
  shipped: { label: "Shipped", variant: "default" },
  delivered: { label: "Delivered", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  confirmed: "processing",
  processing: "shipped",
  shipped: "delivered",
};


export default function SellerDashboard() {
  const [statusMap, setStatusMap] = useState<{ [key: number]: string }>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
 const [adding, setAdding] = useState(false);
 const [selectedBrand, setSelectedBrand] = useState<string>("");
 const [brands, setBrands] = useState<any[]>([]);
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/seller/products");

      console.log("PRODUCTS FINAL:", res.data.data?.data);
      console.log("PRODUCTS:", res.data); // 🔥 DEBUG

      setMyProducts(res.data.data.data); // ✅ FIX
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBrands = async () => {
  try {
    const res = await API.get("/brands");
    setBrands(res.data.data);
  } catch (err) {
    console.error(err);
  }
};

  const handleStatusChange = (orderId: number, value: string) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      console.log("CATEGORIES:", res.data.data);

      setCategories(res.data.data); // ✅ IMPORTANT
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/seller/orders");
      setSellerOrders(res.data.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (adding) return;

  const form = e.currentTarget;

  if (!selectedCategory) {
    toast.error("Select category");
    return;
  }

  if (!selectedBrand) {
    toast.error("Select brand");
    return;
  }

  setAdding(true);

  try {
    const data = new FormData();

    data.append("name", (form.elements.namedItem("name") as HTMLInputElement).value);
    data.append("price", (form.elements.namedItem("price") as HTMLInputElement).value);
    data.append("stock", (form.elements.namedItem("stock") as HTMLInputElement).value);
    data.append("category_id", selectedCategory);
    data.append("brand_id", selectedBrand);
    data.append("description", (form.elements.namedItem("description") as HTMLTextAreaElement).value);

    const fileInput = form.querySelector('input[name="image"]') as HTMLInputElement;

    if (!fileInput?.files?.[0]) {
      toast.error("Please select image");
      setAdding(false);
      return;
    }

    data.append("image", fileInput.files[0]);
    const res = await API.post("/seller/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("RESPONSE:", res.data);

    toast.success("Product added successfully");

    fetchProducts();
    setDialogOpen(false);
    form.reset();
    setSelectedBrand("");
    setSelectedCategory("");

  } catch (err: any) {
    console.log("ERROR:", err.response?.data);
    toast.error(err.response?.data?.message || "Failed to add product");
  } finally {
    setAdding(false);
  }
};

  const handleDelete = async (id: number) => {
  if (deletingId === id) return; // 🔥 prevent double click

  try {
    setDeletingId(id);

    await API.delete(`/seller/products/${id}`);

    toast.success("Product deleted");
    fetchProducts();

  } catch (err) {
    console.error(err);
  } finally {
    setDeletingId(null);
  }
};
  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingProduct) return;

    const form = e.currentTarget;

    try {
      await API.put(`/seller/products/${editingProduct.id}`, {
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        price: Number((form.elements.namedItem("price") as HTMLInputElement).value),
        stock: Number((form.elements.namedItem("stock") as HTMLInputElement).value),
        category_id: editingProduct.category_id,
        brand_id: editingProduct.brand_id,
      });

      toast.success("Product updated");

      fetchProducts(); // refresh
      setEditingProduct(null);

    } catch (err: any) {
        console.log("ERROR FULL:", err);
        console.log("ERROR DATA:", err.response?.data);

        toast.error(err.response?.data?.message || "Error adding product");
      }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await API.post(`/seller/orders/${id}/status`, {
        status: status,
      });
        toast.success("Status updated");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelOrder = (orderId: string) => {
    setSellerOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" as OrderStatus, updatedAt: new Date().toISOString().split("T")[0] } : o))
    );
    toast.success("Order cancelled");
  };

  const totalRevenue = sellerOrders.reduce(
    (sum: number, order: any) =>
      sum + Number(order.total_amount || 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Seller Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, TechVault</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" name="price" type="number" step="0.01" required />
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" name="stock" type="number" required />
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <Select onValueChange={(value) => setSelectedCategory(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div>
                  <Label>Brand</Label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="">Select Brand</option>

                    {brands.map((brand: any) => (
                      <option key={brand.id} value={String(brand.id)}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div>
                <Label>Product Image</Label>
                <Input type="file" name="image" accept="image/*" />
              </div>
              <Button type="submit" className="w-full" disabled={adding}>
                {adding ? "Adding..." : "Add Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>

            {editingProduct && (
              <form onSubmit={handleUpdateProduct} className="space-y-4">

                <div>
                  <Label>Product Name</Label>
                  <Input name="name" defaultValue={editingProduct.name} />
                </div>

                <div>
                  <Label>Price</Label>
                  <Input name="price" type="number" defaultValue={editingProduct.price} />
                </div>

                <div>
                  <Label>Stock</Label>
                  <Input name="stock" type="number" defaultValue={editingProduct.stock} />
                </div>

                <Button type="submit" className="w-full">
                  Update Product
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Products" value={myProducts.length} icon={Package} trend="+2 this month" />
        <StatsCard title="Total Orders" value={sellerOrders.length} icon={ShoppingCart} trend="+12% this month" />
        <StatsCard title="Revenue" value={`₹${totalRevenue.toFixed(2)}`} icon={DollarSign} />
        <StatsCard title="Avg. Rating" value="--" icon={TrendingUp} />
      </div>

      <Tabs defaultValue="products" className="mt-8">
        <TabsList>
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>My Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(myProducts) &&
                    myProducts.map((product: any) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                product.images?.[0]?.image
                                  ? `http://127.0.0.1:8001/storage/${product.images[0].image}`
                                  : "/placeholder.png"
                              }
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell>
                          <Badge variant={product.stock > 20 ? "default" : "destructive"}>
                            {product.stock}
                          </Badge>
                        </TableCell>
                        <TableCell>⭐ {product.rating}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              disabled={deletingId === product.id}
                              onClick={() => handleDelete(product.id)}
                            >
                              {deletingId === product.id ? "..." : <Trash2 className="h-4 w-4" />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(sellerOrders) &&
                    sellerOrders.map((order: any) => {
                      return (
                        <TableRow key={order.id}>

                          {/* ORDER ID */}
                          <TableCell className="font-medium">{order.id}</TableCell>

                          {/* CUSTOMER */}
                          <TableCell>
                            <div>
                              <p>{order.user?.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {order.user?.email}
                              </p>
                            </div>
                          </TableCell>

                          {/* ITEMS */}
                          <TableCell>
                            <div className="space-y-1">
                              {order.order_items?.map((item: any, idx: number) => (
                                <p key={idx} className="text-sm">
                                  {item.variant?.product?.name} × {item.quantity}
                                </p>
                              ))}
                            </div>
                          </TableCell>

                          {/* TOTAL */}
                          <TableCell className="font-semibold">
                            ₹{Number(order.total_amount || 0).toFixed(2)}
                          </TableCell>

                          {/* STATUS */}
                          <TableCell>
                            <select
                                value={statusMap[order.id] || order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className="border rounded-md px-2 py-1 text-sm bg-background"
                              >
                              <option value="pending">pending</option>
                              <option value="confirmed">confirmed</option>
                              <option value="processing">processing</option>
                              <option value="shipped">shipped</option>
                              <option value="delivered">delivered</option>
                              <option value="cancelled">cancelled</option>
                            </select>
                          </TableCell>

                          {/* DATE */}
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>

                          {/* ACTIONS */}
                          <TableCell>
                            <button
                              onClick={() =>
                                updateStatus(order.id, statusMap[order.id] || order.status)
                              }
                              disabled={!statusMap[order.id]}
                              className="bg-orange-100 text-orange-600 px-3 py-1 rounded-md text-sm hover:bg-orange-200"
                            >
                              Update
                            </button>
                            
                          </TableCell>
                          

                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
