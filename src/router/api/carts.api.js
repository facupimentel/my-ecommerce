import { Router } from "express";
import {
  addProductToCart,
  readProductByUser,
  updateQuantity,
  removeProductByCart,
} from "../../controllers/carts.controller.js"

const cartsRouter = Router();

cartsRouter.post("/", addProductToCart);
cartsRouter.get("/users/:user_id", readProductByUser);
cartsRouter.put("/:cart_id", updateQuantity);
cartsRouter.delete("/:cart_id", removeProductByCart);

export default cartsRouter;
