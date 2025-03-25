import productsManager from "../data/mongo/products.mongo.js";


const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readById(pid).populate("product_id");
    if (one) {
      return res.status(200).json({ response: one });
    }
  } catch (error) {
    next(error);
  }
};

const readProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await productsManager.readAll(category);
    if (all.length > 0) {
      return res.status(200).json({ response: all });
    }
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    const one = await productsManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const updateProducts = async (req, res, next) => {
  try {
    // de los requerimientos necesito el id y la data a actualizar
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.updateById(pid, data);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const destroyProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroyById(pid);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

export {
  readOneProduct,
  readProducts,
  createProduct,
  updateProducts,
  destroyProduct,
};
