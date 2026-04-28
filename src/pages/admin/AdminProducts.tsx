import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import API from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState<any[]>([]);

  const filtered = productList.filter(
  (p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.sellerName?.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const res = await API.get("/admin/products");

    console.log("PRODUCTS:", res.data);

    setProductList(res.data.data);
  } catch (err) {
    console.error(err);
  }
};


const deleteProduct = async (id: number) => {
  if (!confirm("Delete this product?")) return;

  try {
    await API.delete(`/admin/products/${id}`);

    // remove from UI
    setProductList((prev) => prev.filter((p) => p.id !== id));

  } catch (err) {
    console.error(err);
  }
};

const updateProduct = async (product: any) => {
  const name = prompt("New name", product.name);
  if (!name) return;

  try {
    await API.put(`/admin/products/${product.id}`, {
      ...product,
      name,
    });

    fetchProducts(); // refresh
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <p className="text-muted-foreground">View all marketplace products</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>All Products ({filtered.length})</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => {
                console.log("IMAGE URL:", product.image); // ✅ correct place

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.png"}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;

                            if (target.src.includes("placeholder.png")) return; 

                            target.src = "/placeholder.png";
                          }}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <span className="font-medium text-foreground">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{product.sellerName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>Rs.{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>⭐ {product.rating}</TableCell>
                    <TableCell>
                      {/* <button
                        onClick={() => updateProduct(product)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </button> */}
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
