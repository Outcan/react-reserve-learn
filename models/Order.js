import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    products: [
      {
        quantity: {
          type: Number,
          default: 1
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product"
        }
      }
    ],
    email: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  new mongoose.model("Order", OrderSchema);
