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
    this.create("/", addProductToCart);
    this.read("/users/:user_id", readProductByUser);
    this.update("/:cart_id", updateQuantity);
    this.destroy("/:cart_id", removeProductByCart);
  };
}


const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()
