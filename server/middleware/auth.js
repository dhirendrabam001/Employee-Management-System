const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // Accept token from cookie OR Authorization Bearer header
    // This is critical for cross-origin deployments where browsers
    // may block SameSite=None cookies (e.g. iOS Safari, some mobile browsers)
    let token = req.cookies.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Accessed Denied" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
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
