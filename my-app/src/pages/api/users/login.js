import { connectDatabase } from "../../../../utils/db";
import passBcrypt from "../../../../utils/bcryptpass";
import User from "../../../models/users.model";
import signToken from "../../../../utils/signToken";
const bcrypt = require("bcrypt");
connectDatabase();

const handler = async (req, res) => {
  const { method } = req;
  const { email, password } = req.body;
  //check method
  if (method !== "POST") {
    return res
      .status(400)
      .json({ success: false, message: "Only POST requests are allowed." });
  }
  //check credentials
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all credentials" });
  }

  //check the password

  let user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "You are not registered" });
  }

  //create new user
  try {
    let verifyPaaword = await bcrypt.compare(password, user.password);

    if (!verifyPaaword) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Password is wrong" });
    }

    let token = signToken(user._id);

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    }
    user.role = undefined;
    user.password = undefined;

    return res.status(201).json({ success: true, data: {user, token},message: "Successfully login" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong" });
  }
};
export default handler;
