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
    this.create("/",["ADMIN"], createProduct);
    this.read("/", ["USER"],readProducts);
    this.read("/:pid", ["USER"], readOneProduct);
    this.update("/:pid", ["ADMIN"], updateProducts);
    this.destroy("/:pid", ["ADMIN"],  destroyProduct);
    this.router.param("pid", pidParam)
  }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter();
