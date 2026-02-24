// scripts/seedProducts.js
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../lib/mongodb.js";
import Product from "../models/Product.js";



const products = [
  {
    name: "iPhone 14",
    price: 70000,
    image:
      "https://techcrunch.com/wp-content/uploads/2022/09/Apple-iphone-14-Pro-review-1.jpeg?w=1024",
    description: "Apple smartphone",
    category: "mobile",
    stock: 10,
  },
  {
    name: "Nike Shoes",
    price: 3000,
    image:
      "https://m.media-amazon.com/images/X/bxt1/M/fbxt1Rza7tR$lhx._SL828_QL90_FMwebp_.jpg",
    description: "Running shoes",
    category: "fashion",
    stock: 20,
  },
  {
    name: "Laptop",
    price: 55000,
    image:
      "https://helios-i.mashable.com/imagery/articles/05djrP5PjtVB7CcMtvrTOAP/images-4.fill.size_2000x1125.v1723100793.jpg",
    description: "16GB RAM Laptop",
    category: "electronics",
    stock: 5,
  },
];

async function seed() {
  await connectDB();

  await Product.deleteMany(); // clean old data
  await Product.insertMany(products);

  console.log("👉 Products Added");
  process.exit();
}

seed();
