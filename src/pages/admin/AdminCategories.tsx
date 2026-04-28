import { useState } from "react";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import API from "@/lib/api";
import { useEffect } from "react";  
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


interface Category {
  id: number; // ✅ FIXED
  name: string;
  description: string;
  products_count: number;
  status: number;
}



export default function AdminCategories() {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);
const [status, setStatus] = useState(true);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [cats, setCats] = useState<Category[]>([]);

  const addCategory = async () => {
  if (!newName.trim()) return toast.error("Category name is required");

  try {
    const res = await API.post("/admin/categories", {
      name: newName,
      description: newDesc,
      parent_id: parentId,
      status: status ? 1 : 0,
    });

    setCats((prev) => [...prev, res.data.data]);

    // reset form
    setNewName("");
    setNewDesc("");
    setParentId(null);
    setStatus(true);

    toast.success("Category added");
  } catch (err) {
    console.error(err);
  }
};


  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description);
  };

  const saveEdit = async () => {
  if (!editName.trim()) return toast.error("Name is required");

  try {
    await API.put(`/admin/categories/${editId}`, {
      name: editName,
      description: editDesc,
      status: 1,
    });

    fetchCategories(); // refresh

    setEditId(null);
    toast.success("Category updated");
  } catch (err) {
    console.error(err);
  }
};

  const toggleStatus = async (cat: any) => {
  try {
    await API.put(`/admin/categories/${cat.id}`, {
      name: cat.name,
      description: cat.description,
      status: cat.status === 1 ? 0 : 1,
    });

    // update UI instantly
    setCats((prev) =>
      prev.map((c) =>
        c.id === cat.id ? { ...c, status: c.status === 1 ? 0 : 1 } : c
      )
    );
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const res = await API.get("/admin/categories");

    console.log("CATEGORIES:", res.data);

    setCats(res.data.data);
  } catch (err) {
    console.error(err);
  }
};

const deleteCategory = async (id: number) => {
  if (!confirm("Delete category?")) return;

  try {
    await API.delete(`/admin/categories/${id}`);
    setCats((prev) => prev.filter((c) => c.id !== id));
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Category</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Add Category
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5 py-4">

              {/* NAME */}
              <div>
                <Label>Name *</Label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <Label>Description</Label>
                <Textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Enter description"
                />
              </div>

              {/* PARENT CATEGORY */}
              <div>
                <Label>Parent</Label>
                <select
                  value={parentId ?? ""}
                  onChange={(e) =>
                    setParentId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-full border rounded-md p-2"
                >
                  <option value="">-- Root --</option>
                  {cats.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
                <Label>Active</Label>
              </div>
            </div>

            {/* FOOTER */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button onClick={addCategory} className="w-full">
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5" /> All Categories ({cats.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cats.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium text-foreground">{cat.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">{cat.description}</TableCell>
                  <TableCell>{cat.products_count}</TableCell>
                  <TableCell>
                    <Badge
                      onClick={() => toggleStatus(cat)}
                      className={`cursor-pointer ${
                        cat.status === 1 ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {cat.status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(cat)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit Category</DialogTitle></DialogHeader>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteCategory(Number(cat.id))}>
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
