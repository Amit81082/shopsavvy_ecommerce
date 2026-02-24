"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    register(form);
    router.push("/auth/login");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Register</h1>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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

      <div className="flex items-center justify-center">
        <button
          onClick={handleSubmit}
          className="bg-black text-white w-full flex items-center justify-center px-4 py-2 mb-2 rounded cursor-pointer"
        >
          Register
        </button>
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/auth/login">
          <span className="underline text-red-600">Login</span>
        </Link>
      </p>
      </div>
    </div>
  );
}
