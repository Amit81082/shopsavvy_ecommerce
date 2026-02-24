import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const {id} = await params;
    const order = await Order.findById(id);

    return Response.json(order);
  } catch(error) {
    console.log(error.message);
    return Response.json({ error: error.message }, { status: 404 });
  }
}
