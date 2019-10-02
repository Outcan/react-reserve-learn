import mongoose from "mongoose";
import shortid from "shortid";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product requires a name."]
  },
  price: {
    type: Number,
    required: [true, "A product requires a price."]
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate()
  },
  description: {
    type: String,
    required: [true, "A product requires a description."]
  },
  mediaUrl: {
    type: String,
    required: [true, "A product requires an image."]
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
