import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();

// esto va en controllers //
const register = async (req, res, next) => {
  try {
    const response = req.user;
    res.status(201).json({
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // traemos los datos del formulario de sign in
    const response = req.user;
    const token = req.token
    res.status(200).json({
      token,
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};

const online = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      res.status(200).json({
        user_id: req.session.user_id,
        method: req.method,
        url: req.url,
      });
    } else {
      const error = new Error("invalid credentials");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.status(200).json({
      message: "signed out",
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};

const badAuth = async (req, res, next) => {
  try {
    const error = new Error("bad auth from redirect");
    error.status = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const response = req.user;
    res.status(200).json({
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};
// esto va en controllers //

authRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  register
);
authRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  login
);
authRouter.post("/online", online);
authRouter.post("/signout", signout);
authRouter.get("/bad-auth", badAuth);
// ruta para pantalla de conocimiento (google), y accede al objeto profile de google con los datos del usuario
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"], failureRedirect: "/api/auth/bad-auth"})
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

export default authRouter;
