import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  console.log("token", token);
  console.log("req.body", req);
  if (token) {
    try {
      const decode = jwt.verify(token, "secretKey");
      req.userId = decode._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Доступ запрещен",
      });
    }
  } else {
    console.log("403", 403);
    return res.status(403).json({
      message: "Доступ запрещен",
    });
  }
};
