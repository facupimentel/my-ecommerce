const pathHandler = (req, res) => {
  const message = "not found";
  const data = { 
    method: req.method, 
    url: req.originalUrl, 
    error: message };
  res.status(404).json(data);
};

export default pathHandler;
