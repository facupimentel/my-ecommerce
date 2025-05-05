import { Types } from "mongoose";
import productsManager from "../data/mongo/products.mongo.js";
import setupResponses from "../middlewares/setupResponses.mid.js";
import {
  createOneServices,
  readByIdServices,
  readAllServices,
  updateByIdServices,
  destroyByIdServices,
} from "../services/products.services.js";

const readOneProduct = async (req, res) => {
  const { pid } = req.params;
  const one = await readByIdServices(pid);
  if (one) {
    res.json200(one);
  }
};

const readProducts = async (req, res) => {
  const { filter } = req.query;
  const all = await readAllServices(filter);
  if (all.length > 0) {
    res.json200(all);
  }
};

const createProduct = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const one = await createOneServices(data);
  res.json201(one);
};

const updateProducts = async (req, res) => {
  // de los requerimientos necesito el id y la data a actualizar
  const { pid } = req.params;
  const data = req.body;
  const one = await updateByIdServices(pid, data);
  res.json200(one);
};

const destroyProduct = async (req, res) => {
  const { pid } = req.params;
  const one = await destroyByIdServices(pid);
  res.json200(one);
};

const pidParam = async (req, res, next, pid) => {
  const isObjectId = Types.ObjectId.isValid(pid);
  if (isObjectId) return next();
  const error = new Error("Invalid ID");
  error.status = 400;
  throw error;
};

export {
  readOneProduct,
  readProducts,
  createProduct,
  updateProducts,
  destroyProduct,
  pidParam,
};
