"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function CheckoutPage() {
const router = useRouter();
const [userId, setUserId] = useState(null);
const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
});
const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState({});
const { cart, totalPrice, clearCart } = useCart();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/auth/login");
    }
  }, []);


useEffect(() => {
  const user = localStorage.getItem("user");

  if (user) {
    setUserId(JSON.parse(user).userId);
  }
}, []);


 const formattedItems = cart.map((item) => ({
   productId: item._id,
   title: item.name,
   price: item.price,
   quantity: item.qty,
 }));

 const validateForm = () => {
   let newErrors = {};

   if (!form.name.trim()) {
     newErrors.name = "Name is required";
   }
   if (!form.email.trim()) {
     newErrors.email = "Email is required";
   }
   if (!form.phone.trim()) {
     newErrors.phone = "Phone is required";
   }
   if (!form.address.trim()) {
     newErrors.address = "Address is required";
   }
   setErrors(newErrors);
   setTimeout(() => setErrors({}), 2000);

   return Object.keys(newErrors).length === 0;
 };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [name]: "" });
  };


  const placeOrder = async () => {
    if (!validateForm()) return;
     if (loading) return; // 👉 safety
     setLoading(true);

    const res = await fetch("/api/saveOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        items: formattedItems,
        totalAmount: totalPrice,
        shipping: form,
        paymentStatus: "Paid", // dummy
      }),
    });

    const data = await res.json();


    if (res.ok) {
      clearCart(); // 👉 clear cart
      router.push("/orders"); // 👉 go to history
    } else {
      setErrors(data.error);
      setTimeout(() => setErrors(null), 7000);
      setLoading(false);
    }
  };

if (cart.length === 0) {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl font-bold">Your Cart is Empty</h2>

      <button
        onClick={() => router.push("/")}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
}

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* LEFT → FORM */}
      <div className="bg-white shadow p-6 rounded space-y-4">
        <h2 className="text-xl font-bold">Shipping Details</h2>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-500 text-sm font-bold text-center ">
            {errors.name}
          </p>
        )}
        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-sm font-bold text-center ">
            {errors.email}
          </p>
        )}

        <input
          name="phone"
          placeholder="Phone"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm font-bold text-center ">
            {errors.phone}
          </p>
        )}

        <textarea
          name="address"
          placeholder="Address"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        {errors.address && (
          <p className="text-red-500 text-sm font-bold text-center">
            {errors.address}
          </p>
        )}
      </div>

      {/* RIGHT → SUMMARY */}
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>
              {item.name} x {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className={`w-full mt-6 py-2 rounded cursor-pointer text-white
    ${loading ? "bg-gray-400" : "bg-black"}
  `}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
