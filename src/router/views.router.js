import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get("/", async(req, res)=>{
    try {
        const data = {
            title: "HOME"
        }
        res.status(200).render("index", data)
    } catch (error) {
        res.status(404).render("error")
    }
})

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


export default viewsRouter