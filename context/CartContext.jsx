"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // 👉 Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);

      if (exist) {
         if (exist.qty >= product.stock) {
           alert("Out of stock");
           return prev;
         }
        // 👉 increase qty
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      // 👉 new product
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);


  // quantity controls
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? item.qty >= item.stock
            ? (alert(`Out of stock for ${item.name}`), item)
            : { ...item, qty: item.qty + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item._id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  // clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // removing product
  const removeFromCart = (id) => {
    const confirmRemove = window.confirm(`Are you sure you want to remove ${cart.find((item) => item._id === id)?.name} from cart?`);
    if (!confirmRemove) return;
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
