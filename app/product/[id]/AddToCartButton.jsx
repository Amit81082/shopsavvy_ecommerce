"use client";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
    
        addToCart(product);
      }}
      className="mt-4 bg-black text-white px-4 py-2 rounded cursor-pointer"
    >
      Add to Cart
    </button>
  );
}
