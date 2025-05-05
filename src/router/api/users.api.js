import CustomRouter from "../custom.router.js";
import { readUsers, createUser, destroyUser, updateUser, readOneUser } from "../../controllers/users.controller.js"
import passportCb from "../../middlewares/passportCb.mid.js";

class UsersRouter extends CustomRouter{
  constructor(){
    super()
    this.init()
  }
  init = ()=>{
    this.create("/", ["admin"], createUser);
    this.read("/", ["user"], readUsers);
    this.read("/:uid", ["user"],readOneUser);
    this.update("/:uid", ["admin"], updateUser);
    this.destroy("/:uid", ["admin"], destroyUser);
    // this.router.param("uid", uidParam)
  }
}

const usersRouter = new UsersRouter()
export default usersRouter.getRouter()