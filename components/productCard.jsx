import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="border p-4 rounded cursor-pointer hover:shadow">
        <img src={product.image} className="w-full h-40 object-cover" />
        <h2 className="font-bold mt-2">{product.name}</h2>
        <p className="text-green-600">₹{product.price}</p>
      </div>
    </Link>
  );
}
