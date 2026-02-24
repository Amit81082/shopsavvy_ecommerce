"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrdersPage() {
 const [orders, setOrders] = useState([]);
 const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${user.userId}`);
        const data = await res.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-lg">Loading orders...</p>
      </div>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">No Orders Yet</h2>

        <button
          onClick={() => router.push("/")}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
      <Link key={order._id} href={`/orders/${order._id}`}>
        <div
          key={order._id}
          className="border rounded-lg shadow p-4 bg-white cursor-pointer mb-3 hover:shadow-md"
        >
          {/* Header */}
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-semibold">OrderID: {order._id}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </div>

            <span className="bg-green-100 text-green-700   py-3 px-2 rounded text-sm text-center">
              {order.paymentStatus}
            </span>
          </div>

          {/* Items */}
          <div className="border-t pt-2 space-y-1">
            {order.items.map((item, index) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t mt-3 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      </Link>
      ))}
    </div>
  );
}
