"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Load session
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const register = async (formdata) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formdata),
    });

    const data = await res.json();
  };


  const login = async(email, password) => {
   const res = await fetch("/api/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});

const data = await res.json();

if (data.userId) {
  setUser(data);
  localStorage.setItem("user", JSON.stringify(data));
  router.push("/");
}

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
