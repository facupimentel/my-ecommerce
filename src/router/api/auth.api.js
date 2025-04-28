import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import {register, login, online, signout, badAuth, google, profile} from "../../controllers/auth.controller.js"

const authRouter = Router();



authRouter.post(
  "/register",
passportCb("register"),
  register
);

authRouter.post(
  "/login",
 passportCb("login"),
  login
);

authRouter.post(
  "/online",
  passportCb("current"),
  online
);

authRouter.post(
  "/signout",
  passport.authenticate("current", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  signout
);

authRouter.get("/bad-auth", badAuth);
// ruta para pantalla de conocimiento (google), y accede al objeto profile de google con los datos del usuario
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/api/auth/bad-auth",
  })
);
// segunda logica para acceder a la estrategia con los datos del profile del usuario

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  google
);
authRouter.get("/profile", profile);

export default authRouter;
