"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  });

  const handleSubmit = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <h1 className="text-xl font-bold">Add Product</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          className="border p-2 w-full"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ))}

      <button onClick={handleSubmit} className="bg-black text-white p-2 w-full">
        Add Product
      </button>
    </div>
  );
}
