const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("auth", token);

  //   check token access or not
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token accessed denied" });
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log("Decoded", decoded);
};

module.exports = auth;
