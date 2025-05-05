import express from "express"
import { engine } from "express-handlebars"
import "dotenv/config.js"
import "./src/helpers/setEnv.helper.js"
import session from "express-session"
import connectMongo from "./src/helpers/dbConnect.helper.js"
import router from "./src/router/index.router.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import __dirname from "./utils.js"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import sessionFileStore from "session-file-store"
import MongoStore from "connect-mongo"
import args from "./src/helpers/setArgs.helper.js"

const server = express()
const port = process.env.PORT
const ready =()=>{
    console.log("server ready on port", port);
        console.log("server ready on mode", args.mode);

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
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser(process.env.COOKIE_KEY))
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ttl: 7*24*60*60, mongoUrl: process.env.MONGO})
  })
);


// router
server.use("/", router)
server.use(pathHandler)
server.use(errorHandler)

