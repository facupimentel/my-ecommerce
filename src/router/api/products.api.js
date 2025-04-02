import { Router } from "express";
import {readOneProduct,
  readProducts,
  createProduct,
  updateProducts,
  destroyProduct,} from "../../controllers/products.controller.js"
import isAdmin from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router()

productsRouter.get("/", readProducts);
productsRouter.post("/", isAdmin, createProduct);
productsRouter.get("/:pid", readOneProduct);
productsRouter.put("/:pid", updateProducts);
productsRouter.delete("/:pid", destroyProduct);


export default productsRouter