// import usersManager from "../data/fs/users.fs.js";
import usersManager from "../data/mongo/users.mongo.js";

const readUsers = async (req, res, next) => {
  try {
    const { data } = req.body;
    const one = await usersManager.read(data);
    if (one.length > 0) {
      return res.status(200).json({ response: one });
    }
    const error = new Error("not found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

const readOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readById(uid);
    if (one) {
      return res.status(200).json({ response: one });
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.email) {
      const error = new Error("type email");
      error.status = 400;
      throw error;
    }
    if (!data.password) {
      const error = new Error("type password");
      error.status = 400;
      throw error;
    }
    if (!data.age) {
      const error = new Error("type age");
      error.status = 400;
      throw error;
    }
    if (data.age < 18) {
      const error = new Error("at least 18");
      error.status = 400;
      throw error;
    }
    const one = await usersManager.create(data);
    return res.status(201).json({ response: one });
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
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const destroyUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.destroyById(uid);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

export { readUsers, createUser, destroyUser, updateUser, readOneUser };
