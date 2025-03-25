import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
    mail: { type: String, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://media.ambito.com/p/accb5b389211cffcef4f2da0367332e1/adjuntos/239/imagenes/040/147/0040147462/gago-dtjpg.jpg",
    },
    role: { type: String, default: "user", enum: ["user", "admin", "prem"] },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
