import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    await connectDB();

    // 👉 Find user
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 400 });
    }

    // 👉 Check password
    if (user.password !== password) {
      return Response.json({ error: "Invalid password" }, { status: 400 });
    }

    return Response.json({
      message: "Login success",
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
