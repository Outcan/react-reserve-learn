import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
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
  ]
});

export default mongoose.models.Cart || new mongoose.model("Cart", CartSchema);
