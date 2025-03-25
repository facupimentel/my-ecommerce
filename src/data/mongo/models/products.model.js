import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    stock: { type: Number, default: 10 },
    price: { type: Number, default: 10 },
    thumbnails: {
      type: [String],
      default: "https://static.thenounproject.com/png/3407390-200.png",
    },
    category: { type: String, default: "none" },
  },
  { timestamps: true }
);

const Product = model(collection, schema);
export default Product;
