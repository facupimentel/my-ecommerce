import CustomRouter from "../custom.router.js";
import {
  readOneProduct,
  readProducts,
  createProduct,
  updateProducts,
  destroyProduct,
  pidParam,
} from "../../controllers/products.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class ProductsRouter extends CustomRouter{
  constructor(){
    super()
    this.init()
  }
  init = ()=>{
    this.create("/",["admin"], createProduct);
    this.read("/", ["public"], readProducts);
    this.read("/:pid", ["public"], readOneProduct);
    this.update("/:pid", ["admin"], updateProducts);
    this.destroy("/:pid", ["admin"],  destroyProduct);
    this.router.param("pid", pidParam)
  }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter();
