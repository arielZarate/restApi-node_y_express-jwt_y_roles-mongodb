//midleware

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "token not provided" });
    }

    let token_decode = jwt.decode(token, process.env.SECRET_KEY);

    if (!token_decode) {
      res.status(403).json({ message: "Unauthorized 👹" });
    }

    req.id = token_decode.object.id; //guardo ese id

    let userById = await User.findById(req.id);

    if (!userById) {
      return res.status(404).json("User not Found");
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.json({ message: "Unauthorized 😫😫" });
  }
};
