import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, items, totalAmount, shipping, paymentStatus } = body;

    await connectDB();

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      shipping, // 👉 add
      paymentStatus,
      createdAt: new Date(),
    });



    return Response.json({
      message: "Order saved",
      orderId: order._id,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

}
