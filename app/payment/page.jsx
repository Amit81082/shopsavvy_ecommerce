"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("checkoutCart"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (!cart || !user) {
      router.push("/");
    }
  }, []);

  const handlePayment = async () => {
    const cart = JSON.parse(localStorage.getItem("checkoutCart"));
    const user = JSON.parse(localStorage.getItem("user"));

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const formattedItems = cart.map((item) => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.qty,
    }));

    await fetch("/api/saveOrder", {
      method: "POST",
      body: JSON.stringify({
        userId: user.userId,
        items: formattedItems,
        totalAmount: total,
      }),
    });

    // 👉 clear carts
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");

    router.push("/orders");
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <button onClick={handlePayment}>Pay Now (Dummy)</button>
    </div>
  );
}
