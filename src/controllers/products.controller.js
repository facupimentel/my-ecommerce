import { Types } from "mongoose";
import productsManager from "../data/mongo/products.mongo.js";
import setupResponses from "../middlewares/setupResponse.mid.js";

const readOneProduct = async (req, res) => {
    const { pid } = req.params;
    const one = await productsManager.readById(pid).populate("product_id");
    if (one) {
      res.json200(one)
    }
};

const readProducts = async (req, res) => {
    const { category } = req.query;
    const all = await productsManager.readAll(category);
    if (all.length > 0) {
      res.json200(all)
    }
};

const createProduct = async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const one = await productsManager.create(data);
    res.json201(one)
  };

const updateProducts = async (req, res) => {
    // de los requerimientos necesito el id y la data a actualizar
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.updateById(pid, data);
    res.json200(one)
  };

const destroyProduct = async (req, res) => {
    const { pid } = req.params;
    const one = await productsManager.destroyById(pid);
    res.json200(one);
  };

const pidParam = async (req,res,next,pid)=>{
  const isObjetId = Types.ObjectId.isValid(pid)
  if(!isObjetId) return next()
    const error = new Error("Invalid ID")
  error.status = 400
  throw error
}

export {
  readOneProduct,
  readProducts,
  createProduct,
  updateProducts,
  destroyProduct,
  pidParam,
};
