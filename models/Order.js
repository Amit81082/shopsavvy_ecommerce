import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // 👉 User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 👉 Items
  items: [
    {
      productId: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  // 👉 Total
  totalAmount: {
    type: Number,
    required: true,
  },

  // 👉 Shipping Info
  shipping: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },

  // 👉 Payment
  paymentStatus: {
    type: String,
    default: "Pending", // Pending | Paid | Failed
  },

  // 👉 Time
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
