import productsManager from "../data/mongo/products.mongo.js";

const createOneServices = async (data) => await productsManager.create(data);

const readByIdServices = async (pid) =>
  await productsManager.readById(pid).populate("product_id");

const readAllServices = async (filter) =>
  await productsManager.readAll(filter);

const updateByIdServices = async (pid, data) =>
  await productsManager.updateById(pid, data);

const destroyByIdServices = async (pid) =>
  await productsManager.destroyById(pid);

export {
  createOneServices,
  readByIdServices,
  readAllServices,
  updateByIdServices,
  destroyByIdServices
,
};
