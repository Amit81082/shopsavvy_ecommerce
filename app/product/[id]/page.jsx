import AddToCartButton from "./AddToCartButton";
import { notFound } from "next/navigation";

async function getProducts(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const {id} = await params;
  const product = await getProducts(id);

 if (!product) return notFound();

  return (
    <div className="p-6">
      <img src={product.image} className="w-64" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-green-600 text-xl">₹{product.price}</p>
      <p>{product.description}</p>
      <p className="text-gray-500">Stock: {product.stock}</p>

      {/* 👉 Add to Cart */}
      <AddToCartButton product={product} />
    </div>
  );
}
