import Jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "user is not Authenticated...",
      });
    }
    const deCode = await Jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(deCode);
    if (!deCode) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token...",
      });
    }
    req.id = deCode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
