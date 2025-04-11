import Manager from "./manager/manager.mongo.js"
import Cart from "./models/carts.model.js"

class CartsManager extends Manager {
    constructor(){
        super(Cart)
    }

    addProductToCart = async (user_id, product_id, quantity) =>{
        try {
            const one = await this.create({user_id, product_id, quantity})
            return one
        } catch (error) {
            throw error
        }
    }

    readProductByUser = async (user_id) =>{
        try {
            const all = await this.readMongo({ user_id });
            return all
        } catch (error) {
            throw error
        }
    }

    updateQuantity = async (cart_id, quantity) =>{
        try {
           const one = await this.updateById(cart_id, {quantity})
           return one 
        } catch (error) {
            throw error
        }
    }

    removeProductByCart = async (cart_id) =>{
        try {
            const one = await this.destroyById(cart_id)
            return one
        } catch (error) {
            throw error
        }
    }

}

const cartsManager = new CartsManager()
export default cartsManager