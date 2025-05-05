import {verifyToken} from "../helpers/token.helper.js"

const setupPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("public")) return next();
    const token = req?.cookies?.token;
    if (!token) return res.json401("Token no proporcionado");
    const data = verifyToken(token);
    const { role, user_id } = data;
    if (!role || !user_id) return res.json401();
    const roles = {
      user: policies.includes("user"),
      admin: policies.includes("admin"),
    };
    if(roles[role]){
        req.user = data
        return next()
    } else {
        res.json403()
    }
  } catch (error) {
    next()
  }
};

export default setupPolicies
