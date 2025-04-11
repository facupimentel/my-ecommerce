import CustomRouter from "./custom.router.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views.router.js";

class Router extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/", viewsRouter);
    this.use("/api", apiRouter);
  };
}



const router = new Router();
export default router.getRouter()