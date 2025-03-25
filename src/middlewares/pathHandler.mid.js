const pathHandler = (req, res) =>{
    const message = "not found"
    res.status(404).json({ method: req.method, url: req.url, error: message });
}

export default pathHandler