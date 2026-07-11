const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("token", token);

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
    // console.log("decoded", decoded);
  } catch (error) {
    console.error(error);
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      path: "/",
    });
    return res
      .status(401)
      .json({ success: false, message: "Token expired, please login again!" });
  }
};

module.exports = auth;
