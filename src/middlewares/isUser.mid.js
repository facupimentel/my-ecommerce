import usersManager from "../data/mongo/users.mongo.js";
import { verifyToken } from "../helpers/token.helper.js";

const isUser = async (req, res, next) => {
  try {
    const headers = req?.headers?.authorization;
    if (!headers || !headers.startsWith("Bearer ")) {
      const error = new Error("token is required");
      error.status = 403;
      throw error;
    }
    const token = headers.split(" ")[1];
    const data = verifyToken(token);
    const user = await usersManager.readById(data.user_id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isUser;
