import productsManager from "../data/mongo/products.mongo.js";


const readOneProduct = async (req, res) => {
    const { pid } = req.params;
    const one = await productsManager.readById(pid).populate("product_id");
    if (one) {
      return res.status(200).json({ response: one });
    }
};

const readProducts = async (req, res) => {
    const { category } = req.query;
    const all = await productsManager.readAll(category);
    if (all.length > 0) {
      return res.status(200).json({ response: all });
    }
};

const createProduct = async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const one = await productsManager.create(data);
    return res.status(201).json({ response: one });
};

const updateProducts = async (req, res) => {
    // de los requerimientos necesito el id y la data a actualizar
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.updateById(pid, data);
    return res.status(200).json({ response: one });
};

const destroyProduct = async (req, res) => {
    const { pid } = req.params;
    const one = await productsManager.destroyById(pid);
    return res.status(200).json({ response: one });
};

export {
  readOneProduct,
  readProducts,
  createProduct,
  updateProducts,
  destroyProduct,
};
