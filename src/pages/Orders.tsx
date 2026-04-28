import { useState, useEffect } from "react";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/my-orders");

      // 🔥 IMPORTANT FIX
      const data = res.data.data || res.data;

      setOrders(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Filter logic
  const filtered = (orders || []).filter((o: any) =>
    filterStatus === "all"
      ? true
      : o.status?.toLowerCase() === filterStatus.toLowerCase()
  );

  const statusList: (OrderStatus | "all")[] = [
    "all",
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <div className="bg-background min-h-screen p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* 🔹 SIDEBAR */}
        <div className="bg-white rounded-2xl shadow p-4 h-fit space-y-2">

          <button
            onClick={() => navigate("/orders")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              location.pathname === "/orders"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            📦 My Orders
          </button>

          <button
            onClick={() => navigate("/wishlist")}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            ❤️ Wishlist
          </button>

          {/* <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            👤 Profile
          </button> */}

        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow p-6">

          {/* Header */}
          <h2 className="text-xl font-semibold">My Orders</h2>
          <p className="text-muted-foreground text-sm">
            Track and manage your purchases
          </p>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {statusList.map((status) => (
              <Button
                key={status}
                size="sm"
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(status)}
              >
                {status === "all"
                  ? "All"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="p-3 text-left">ORDER ID</th>
                  <th className="p-3 text-left">DATE</th>
                  <th className="p-3 text-left">ITEMS</th>
                  <th className="p-3 text-left">TOTAL</th>
                  <th className="p-3 text-left">STATUS</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((order: any) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">
                      {order.order_number || order.id}
                    </td>

                    <td className="p-3 text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {order.items?.length || 0}
                    </td>

                    <td className="p-3 font-semibold">
                      ₹{Number(order.total_amount || 0).toFixed(2)}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs capitalize ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-10 text-center text-muted-foreground">
                No orders found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}