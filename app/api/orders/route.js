import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    await connectDB();

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return Response.json(orders);
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
