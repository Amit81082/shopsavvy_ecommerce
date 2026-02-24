import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // 👉 Connect DB
    await connectDB();

    // 👉 Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // 👉 Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    return Response.json({
      message: "User created",
      userId: user._id,
    });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
