// import usersManager from "../data/fs/users.fs.js";
import usersManager from "../data/mongo/users.mongo.js";
import setupResponses from "../middlewares/setupResponse.mid.js";

const readUsers = async (req, res, next) => {
  try {
    const { data } = req.body;
    const one = await usersManager.read(data);
    if (one.length > 0) {
      res.json200(one)
    }
    res.json404(one)
  } catch (error) {
    next(error);
  }
};

const readOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readById(uid);
    if (one) {
      res.json200(one)
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.email) {
      res.json400("type email");
    }
    if (!data.password) {
      res.json400("type password");
    }
    if (!data.age) {
      res.json400("type age");

    }
    if (data.age < 18) {
      res.json400("at least 18");
    }
    const one = await usersManager.create(data);
    res.json201(one)
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    // de los requerimientos necesito el id y la data a actualizar
    const { uid } = req.params;
    const data = req.body;
    const one = await usersManager.updateById(uid, data);
    res.json200(one)
  } catch (error) {
    next(error);
  }
};

const destroyUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.destroyById(uid);
    res.json200(one)
  } catch (error) {
    next(error);
  }
};

export { readUsers, createUser, destroyUser, updateUser, readOneUser };
