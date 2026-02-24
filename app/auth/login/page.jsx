"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    const ok = login(form.email, form.password);

    if (ok) router.push("/");
    else alert("Invalid credentials");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin} className="bg-black text-white w-full flex items-center justify-center px-4 py-2 mb-2 rounded cursor-pointer">
        <span className="mx-auto">Login</span>
      </button>
     <p className="text-center">
             Don&apos;t have an account?{" "}
             <Link href="/auth/register">
               <span className="underline text-red-600">Register</span>
             </Link>
           </p>
    </div>
  );
}
