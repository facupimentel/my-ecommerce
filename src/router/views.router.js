import { Router } from "express";
import productsManager from "../data/mongo/products.mongo.js"
import usersManager from "../data/mongo/users.mongo.js"

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  try {
    const data = {
      title: "HOME",
    };
    res.status(200).render("index", data);
  } catch (error) {
    res.status(404).render("error");
  }
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const all = await productsManager.readMongo()
    const data = {
      title: "Products",
      products: all
    };
    res.status(200).render("products", data);
  } catch (error) {
    res.status(404).render("error");
  }
});

viewsRouter.get("/register", async (req, res) => {
  try {
    const data = {
      title: "Register Form",
    };
    res.status(200).render("register", data);
  } catch (error) {
    res.status(404).render("error");
  }
});

viewsRouter.get("/login", async (req, res) => {
  try {
    const data = {
      title: "Sign In",
    };
    res.status(200).render("login", data);
  } catch (error) {
    res.status(404).render("error");
  }
});

viewsRouter.get("/profile/:uid", async (req, res) => {
  try {
    const {uid} = req.params
    const one = await usersManager.readById(uid)
    if(!one){
      res.status(200).render("signin")
    }
    const data = {
      title: "Perfil",
      users: one,
    };
    res.status(200).render("profile", data);
  } catch (error) {
    res.status(404).render("error");
  }
});

export default viewsRouter;
