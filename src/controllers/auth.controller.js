const register = async (req, res, next) => {
  try {
    const response = req.user;
    res.json201(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // traemos los datos del formulario de sign in
    const response = req.user;
    const token = req.token;
    const opts = { maxAge: 7 * 24 * 60 * 60, httpOnly: true };
    res.cookie("token", token, opts).status(200).json({
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};

const online = async (req, res, next) => {
  try {
    if (req.user._id) {
      res.json200(req.user._id);
    } else {
      res.json401("invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({
      message: "signed out",
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};

const badAuth = async (req, res, next) => {
  try {
    res.json401("bad auth from redirect");
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const response = req.user;
    res.json200(response);
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    res.status(200).json({
      response: {
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        role: req.user.role,
      },
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};


export {register, login, online, signout, badAuth, google, profile}