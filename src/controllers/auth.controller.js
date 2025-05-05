const register = async (req, res) => {
  const response = req.user;
  res.json201(response);
};

const login = async (req, res) => {
  // traemos los datos del formulario de sign in
  const response = req.user;
  const token = req.token;
  const opts = { maxAge: 7 * 24 * 60 * 60, httpOnly: true };
  res.cookie("token", token, opts).json200(response, "logged in")
};

const online = async (req, res) => {
  if (!req.user.user_id) {
    res.json401("invalid credentials");
  }
  res.json200({user: req.user});
};

const signout = async (req, res) => {
  res.clearCookie("token").json200(null, "signed out")
};

const badAuth = async (req, res) => {
  res.json401("bad auth from redirect");
};

const google = async (req, res) => {
  const response = req.user;
  res.json200(response);
};

const profile = async (req, res) => {
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
};

export { register, login, online, signout, badAuth, google, profile };
