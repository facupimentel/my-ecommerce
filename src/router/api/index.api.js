import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import authRouter from "./auth.api.js";

const apiRouter = Router()

apiRouter.use("/products", productsRouter)
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/auth", authRouter)


export default apiRouter