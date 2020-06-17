require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.isAuth = (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!token) {
    const error = new Error("TOKEN NOT FOUND");
    error.statusCode = 401;
    throw error;
  }
  const token = authorization.split(" ")[1];

  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    e.statusCode = 500;
    throw e;
  }

  if (!decoded) {
    const error = new Error("INVALID TOKEN");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decoded.userId;
  next();
};
