import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
