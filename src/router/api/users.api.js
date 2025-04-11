import CustomRouter from "../custom.router.js";
import { readUsers, createUser, destroyUser, updateUser, readOneUser } from "../../controllers/users.controller.js"
import passportCb from "../../middlewares/passportCb.mid.js";

class UsersRouter extends CustomRouter{
  constructor(){
    super()
    this.init()
  }
  init = ()=>{
    this.create("/", passportCb("admin"), createUser);
    this.read("/", readUsers);
    this.read("/:uid", readOneUser);
    this.update("/:uid", passportCb("admin"), updateUser);
    this.destroy("/:uid", passportCb("admin"), destroyUser);
    // this.router.param("uid", uidParam)
  }
}

const usersRouter = new UsersRouter()
export default usersRouter.getRouter()