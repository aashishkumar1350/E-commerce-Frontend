import { useEffect, useState } from "react";
import { getOrdersAPI } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersAPI();
        setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order: any) => (
          <div
            key={order.id}
            className="border p-4 mb-4 rounded cursor-pointer"
            onClick={() => navigate(`/my-orders/${order.id}`)}
          >
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ₹{Number(order.total_amount).toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
}