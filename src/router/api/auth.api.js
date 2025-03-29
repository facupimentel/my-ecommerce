import { Router } from "express";
import usersManager from "../../data/mongo/users.mongo.js"

const authRouter = Router()

const register = async (req, res, next)=>{
    try {
        const data = req.body
        const response = await usersManager.create(data)
        res.status(201).json({
            response,
            method: req.method,
            url: req.url
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next)=>{
    try {
        // traemos los datos del formulario de sign in
        const {email, password} = req.body
        const response = await usersManager.readBy({email, password})
        // si la contraseña es incorrecta...
        if(response.password !== password){
            const error = new Error("invalid credentials")
            error.status = 401
            throw error
        }
        // guardamos los datos en una session
        req.session.user_id = response._id
        req.session.email = email
        req.session.role = response.role
        res.status(200).json({
            response,
            method: req.method,
            url: req.url
        })
    } catch (error) {
        next(error)
    }
}

const online = async (req, res, next)=>{
    try {
        if(req.session.user_id){
            res.status(200).json({
                user_id: req.session.user_id,
                method: req.method,
                url: req.url
            })
        } else {
            const error = new Error("invalid credentials")
            error.status = 401
            throw error
        }
    } catch (error) {
        next(error)
    }
}

const signout = async (req, res,next)=>{
    try {
        req.session.destroy()
        res.status(200).json({
            message: "signed out",
            method: req.method,
            url: req.url
        })
    } catch (error) {
        next(error)
    }
}

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/online", online)
authRouter.post("/signout", signout)

export default authRouter