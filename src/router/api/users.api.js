import { Router } from "express";

const usersRouter = Router()

usersRouter.get("/");
usersRouter.post("/");
usersRouter.get("/:uid");
usersRouter.put("/:uid");
usersRouter.delete("/:uid");

export default usersRouter