import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  const {id} = await params;
  await connectDB();
  const product = await Product.findById(id);
  return Response.json(product);
}
