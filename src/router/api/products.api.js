import CustomRouter from "../custom.router.js";
import {
  readOneProduct,
  readProducts,
  createProduct,
  updateProducts,
  destroyProduct,
} from "../../controllers/products.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class ProductsRouter extends CustomRouter{
  constructor(){
    super()
    this.init()
  }
  init = ()=>{
    this.create("/", passportCb("admin"), createProduct);
    this.read("/", readProducts);
    this.read("/:pid", readOneProduct);
    this.update("/:pid", passportCb("admin"), updateProducts);
    this.destroy("/:pid", passportCb("admin"), destroyProduct);
    // this.router.param("pid", pidParam)
  }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter();
