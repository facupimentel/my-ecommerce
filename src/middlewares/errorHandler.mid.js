const errorHandler = (err, req, res, next) =>{
    console.log(err);
    const error = error.message || "server error"
    const status = error.status || 500
    const data = {
      method: req.method,
      url: req.url,
      error: message,
    }
    res.status(status).json({data})
}

export default errorHandler