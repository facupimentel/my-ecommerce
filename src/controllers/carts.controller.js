import cartsManager from "../data/mongo/carts.mongo.js";

const addProductToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const one = await cartsManager.addProductToCart(
    user_id,
    product_id,
    quantity
  );
  if (one) {
    res.json201(one);
  }
};

const readProductByUser = async (req, res) => {
  const { user_id } = req.params;
  const all = await cartsManager.readProductByUser(user_id);
  if (all.length > 0) {
    res.json200(all);
  }
  res.json404(all);
};

const updateQuantity = async (req, res) => {
  const { cart_id } = req.params;
  const { quantity } = req.body;
  const one = await cartsManager.updateQuantity(cart_id, quantity);
  if (one) {
    res.json200(one);
  }
  res.json404(one);
};

const updateState = async(req, res)=>{
    const {id, state} = req.params
    const states = ["reserved", "paid", "delivered"]
    if (states.includes(state)){
        const one = await cartsManager.updateState(id, state)
        if(one){
            return res.json200(one)
        }
        res.json404()
    }
    res.json400("Invalid state!")
}

const removeProductByCart = async (req, res) => {
  const { cart_id } = req.params;
  const one = await cartsManager.removeProductByCart(cart_id);
  if (!one) {
    res.json404();
  }
  res.json200(one);
};

export {
  addProductToCart,
  readProductByUser,
  updateQuantity,
  removeProductByCart,
};
