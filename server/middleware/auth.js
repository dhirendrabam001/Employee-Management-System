const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token", token);

    // check token access nor not
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Accessed Denied" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
    console.log("decoded", decoded);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = auth;
