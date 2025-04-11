import passport from "passport";

const passportCb = () =>{
    return async(req, res, next)=>{
        passport.authenticate(
            strategy,
            (err, user, info)=>{
                if(err){
                    return next(err)
                }
                if(!user){
                    const error = new Error(info.message || "bad auth from cb")
                    error.status = info.status || 401
                    return next(error)
                }
                req.user = user
                next()
            }
        )(req,res,next)
    }
}

export default passportCb