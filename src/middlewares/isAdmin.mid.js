import { verifyToken } from "../helpers/token.helper.js";

const isAdmin = (req, res, next) => {
  try {
    const headers = req?.headers?.authorization
    if(!headers || !headers.startsWith("Bearer ")){
        const error = new Error("token is required")
        error.status = 401
        throw error
    }
    const token = headers.split(" ")[1]
    const data = verifyToken(token)
    if(data.role === "ADMIN"){
        next()
    } else {
        const error = new Error("forbidden");
        error.status = 401;
        throw error;
    }
  } catch (error) {
    next(error)
  }
};

export default isAdmin;
