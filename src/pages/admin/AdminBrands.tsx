import { useState } from "react";
import { Plus, Pencil, Trash2, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import API from "@/lib/api";
import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
  status: "active" | "inactive";
}


export default function AdminBrands() {
  const [brands, setBrands] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const addBrand = async () => {
    if (!newName.trim()) return toast.error("Brand name is required");

    try {
      const res = await API.post("/admin/brands", {
        name: newName,
        description: newDesc,
        logo : "",
        status: 1,
      });

      setBrands((prev) => [...prev, res.data.data]);

      setNewName("");
      setNewDesc("");

      toast.success("Brand added");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBrand = async (id: number) => {
    if (!confirm("Delete brand?")) return;

    try {
      await API.delete(`/admin/brands/${id}`);
      setBrands((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (brand: Brand) => {
    setEditId(brand.id);
    setEditName(brand.name);
    setEditDesc(brand.description);
  };

  const saveEdit = async () => {
    try {
      await API.put(`/admin/brands/${editId}`, {
        name: editName,
        description: editDesc,
        status: 1,
      });

      fetchBrands();
      setEditId(null);

      toast.success("Brand updated");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (brand: any) => {
    try {
      await API.put(`/admin/brands/${brand.id}`, {
        name: brand.name,
        logo: brand.logo,
        status: brand.status === 1 ? 0 : 1,
      });

      fetchBrands();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await API.get("/admin/brands");

      console.log("BRANDS FULL:", res.data);

      // ✅ SAFE FIX (handles both cases)
      const data = Array.isArray(res.data.data)
        ? res.data.data
        : res.data.data?.data;

      setBrands(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Brands</h1>
          <p className="text-muted-foreground">Manage marketplace brands</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Brand</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Brand</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Name</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Tesla" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Brand tagline or description..." />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={addBrand}>Add Brand</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> All Brands ({brands.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(brands) &&
                brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={brand.logo || `https://ui-avatars.com/api/?name=${brand.name}`}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="font-medium text-foreground">{brand.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">{brand.description}</TableCell>
                  <TableCell>{brand.products_count}</TableCell>

                  <TableCell>
                    <Badge
                      variant={brand.status === 1 ? "default" : "secondary"}
                      onClick={() => toggleStatus(brand)}
                      className="cursor-pointer"
                    >
                      {brand.status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(brand)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit Brand</DialogTitle></DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label>Name</Label>
                              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button onClick={saveEdit}>Save Changes</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteBrand(Number(brand.id))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
