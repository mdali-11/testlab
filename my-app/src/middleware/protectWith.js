import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/users.model";
import handler from "@/pages/api/hello";

const protectWith = (handler) => {
  return async (req, res) => {
    // const { method } = req;
    // if (method !== "POST") {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Only POST requests are allowed." });
    // }

    let token;

    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(req.headers.authorization)
    }

    // console.log(token);
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Please login again" });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log("decoded:", decoded);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res
        .status(400)
        .json({ success: false, message: "token expired, login again" });
    }

    req.user = currentUser;
    return handler(req, res);
  };
};
export default protectWith;
