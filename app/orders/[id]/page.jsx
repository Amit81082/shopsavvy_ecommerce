
async function getOrder(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}

export default async function OrderDetails({ params }) {
  const {id} = await params;
  const order = await getOrder(id);


  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Order Details</h1>

      {/* Order Info */}
      <div key={order._id} className="border p-4 rounded space-y-1">
        <p>
          <b>Order ID:</b> {order._id}
        </p>
        <p>
          <b>Date:</b>{" "}
          {new Date(order.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </p>
        <p>
          <b>Status:</b> {order.paymentStatus}
        </p>
      </div>

      {/* Items */}
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Items</h2>

        {order.items.map((item, i) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>₹{order.totalAmount}</span>
      </div>
    </div>
  );
}
