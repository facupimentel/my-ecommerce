import CustomRouter from "../custom.router.js";
import {
  addProductToCart,
  readProductByUser,
  updateQuantity,
  removeProductByCart,
} from "../../controllers/carts.controller.js"

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["user"],addProductToCart);
    this.read("/users/:user_id", ["user"],readProductByUser);
    this.update("/:cart_id", ["user"],updateQuantity);
    this.destroy("/:cart_id", ["user"],removeProductByCart);
  };
}


const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()
