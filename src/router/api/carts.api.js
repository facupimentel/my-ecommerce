import { Router } from "express";

const cartsRouter = Router()

cartsRouter.get("/");
cartsRouter.post("/");
cartsRouter.get("/:cid");
cartsRouter.put("/:cid");
cartsRouter.delete("/:cid");

export default cartsRouter