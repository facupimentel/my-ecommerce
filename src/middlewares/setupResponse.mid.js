const setupResponses = (req, res, next)=>{
    try {
        const {method, originalUrl: url} = req
        const message = {
            200: "Success",
            201: "Created",
            400: "Client Error",
            401: "Bad Auth",
            403: "Forbidden",
            404: "Not Found",
            500: "Server Error",
        }
        const successResponse = (code, response, message = message[code])=>{
            return res.status(code).json({
            response,
            message,
            method: req.method,
            url: req.originalUrl,
    });
        }
        const errorResponse = (code, message = message[code])=>{
            const error = new Error(message);
            error.statusCode = code;
            throw error;
        };
        res.json200 = (response, message) => successResponse(200, response, message)
        res.json201 = (response, message) => successResponse(201, response, message)
        res.json400 = (message) => successResponse(400, message) 
        res.json401 = (message) => successResponse(401, message)
        res.json403 = (message) => successResponse(403, message)
        res.json404 = (message) => successResponse(404, message)
        res.json500 = (message) => successResponse(500, message)
        next()
    } catch (error) {
        next(error)
    }
}

export default setupResponses