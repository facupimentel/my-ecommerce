import express from "express"
import { engine } from "express-handlebars"
import "dotenv/config.js"
import session from "express-session"
import connectMongo from "./src/helpers/dbConnect.helper.js"
import router from "./src/router/index.router.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import __dirname from "./utils.js"
import morgan from "morgan"
import cookieParser from "cookie-parser"

const server = express()
const port = process.env.PORT
const ready =()=>{
    console.log("server ready on port", port);
    connectMongo()
}
server.listen(port, ready)


// template engine
server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")


//  middlewares
server.use(morgan("dev"))
server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(cookieParser(process.env.COOKIE_KEY))
server.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 7*24*60*60*1000}
    })
)


// router
server.use("/", router)
server.use(pathHandler)
server.use(errorHandler)

