"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/auth/login"); // 🔐 protect
      return;
    }
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    router.push("/checkout");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <div>
          <p className="text-gray-500 mb-2">Cart is empty</p>
          <button
            onClick={() => router.push("/")}
            className="bg-black text-white px-6 py-2 rounded cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white shadow p-4 rounded"
              >
                {/* Item Info */}
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>₹{item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="font-bold">₹{item.price * item.qty}</div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className=" ml-2 px-1 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>

            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
