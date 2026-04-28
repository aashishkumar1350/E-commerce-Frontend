import { useState } from "react";
import { Search, MoreHorizontal, Mail, Shield, ShieldOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import API from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "buyer" | "seller" | "admin";
  status: "active" | "suspended" | "pending";
  joinedAt: string;
  totalOrders: number;
  totalSpent: number;
}



export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (id: string, status: string) => {
  try {
    await API.post(`/admin/users/${id}/status`, { status });

    toast.success("Updated");

    fetchUsers(); // refresh
  } catch (err) {
    toast.error("Failed");
  }
};

  const roleColor = (role: string) => {
    switch (role) {
      case "admin": return "destructive";
      case "seller": return "default";
      default: return "secondary";
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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");

      console.log("USERS:", res.data);

      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground">Manage all registered users</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>All Users ({filtered.length})</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/150?u=${user.id}`}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={roleColor(user.role) as any} className="capitalize">{user.role || "user"}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColor(user.status) as any} className="capitalize">{user.status || "active"}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.joinedAt || "-"}</TableCell>
                  <TableCell>{user.totalOrders}</TableCell>
                  <TableCell>Rs.{Number(user.totalSpent || 0).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info(`Emailing ${user.name}...`)}>
                          <Mail className="mr-2 h-4 w-4" /> Email User
                        </DropdownMenuItem>
                        {user.status !== "active" && (
                          <DropdownMenuItem onClick={() => updateStatus(user.id, "active")}>
                            <Shield className="mr-2 h-4 w-4" /> Activate
                          </DropdownMenuItem>
                        )}
                        {user.status !== "suspended" && (
                          <DropdownMenuItem className="text-destructive" onClick={() => updateStatus(user.id, "suspended")}>
                            <ShieldOff className="mr-2 h-4 w-4" /> Suspend
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
