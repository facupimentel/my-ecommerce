import jwt from "jsonwebtoken"

const createToken = (data)=>{
    try {
        const token = jwt.sign(data, process.env.JWT_KEY, {
          expiresIn: 7 * 24 * 60 * 60,
        });
        return token        
    } catch (error) {
        error.status = 401
        throw error
    }
}

const verifyToken = (token)=>{
    try {
        const verify = jwt.verify(token, process.env.JWT_KEY);
        return verify    
    } catch (error) {
        error.status = 401
        throw error
    }
}

export {createToken, verifyToken}