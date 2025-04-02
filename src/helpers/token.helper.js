import jsonwebtoken from "jsonwebtoken"

const createToken = (data)=>{
    try {
        const token = jsonwebtoken.sign(data, process.env.SECRET, {expiresIn:7*24*60*60})
        return token        
    } catch (error) {
        error.status = 401
        throw error
    }
}

const verifyToken = (token)=>{
    try {
        const verify = jsonwebtoken.verify(token, process.env.SECRET)
        return verify    
    } catch (error) {
        error.status = 401
        throw error
    }
}

export {createToken, verifyToken}