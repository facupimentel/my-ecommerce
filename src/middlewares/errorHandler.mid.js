const errorHandler = (error, req, res, next) =>{
    const message = error.message || "server error"
    const status = error.status || 500
    const data = {
      method: req.method,
      url: req.url,
      error: message,
    }
    res.status(status).json(data)
}

export default errorHandler