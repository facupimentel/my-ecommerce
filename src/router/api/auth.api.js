import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import {
  register,
  login,
  online,
  signout,
  badAuth,
  google,
  profile,
} from "../../controllers/auth.controller.js";
import CustomRouter from "../custom.router.js";

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["public"], passportCb("register"), register);

    this.create("/login", ["public"], passportCb("login"), login);

    this.create("/online", ["public", "admin"], passportCb("current"), online);

    this.create(
      "/signout",
      ["public"]
      ,
      passport.authenticate("current", {
        session: false,
        failureRedirect: "/api/auth/bad-auth",
      }),
      signout
    );

    this.read("/bad-auth", ["public"],badAuth);
    // ruta para pantalla de conocimiento (google), y accede al objeto profile de google con los datos del usuario
    this.read(
      "/google",
      ["public"],
      passport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/auth/bad-auth",
      })
    );
    // segunda logica para acceder a la estrategia con los datos del profile del usuario

    this.read(
      "/google/callback",
      ["public", "admin"]
      ,
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/bad-auth",
      }),
      google
    );
    this.read("/profile", profile);
  };
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();
