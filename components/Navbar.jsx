"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  return (
    <nav className="bg-gray-800 shadow-md px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <h1 className="text-xl font-bold text-green-600">ShopSavvy</h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-white">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/cart" className="relative">
            Cart
            {/* Cart Count */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <Link href="/profile">Profile</Link>
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-2xl text-white" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-3 px-2 text-white">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/cart" className="relative">
            Cart
            {/* Cart Count */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -left bg-red-500 text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <Link href="/profile">Profile</Link>
        </div>
      )}
    </nav>
  );
}
