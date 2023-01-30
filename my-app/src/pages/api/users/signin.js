import { connectDatabase } from "../../../../utils/db";
import passBcrypt from "../../../../utils/bcryptpass";
import User from "../../../models/users.model";

connectDatabase();

const handler = async (req, res) => {
  const { method } = req;
  const { name, email, password } = req.body;
  //check method
  if (method !== "POST") {
    return res
      .status(400)
      .json({ success: false, message: "Only POST requests are allowed." });
  }
  //check credentials
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all credentials" });
  }
  //check exiting user
  let existUser = await User.findOne({ email });
  if (existUser) {
    return res
      .status(400)
      .json({ success: false, message: "You are already signup" });
  }

  let newUser;
  //create new user
  try {
    let encrpitedPassword = await passBcrypt(password);
    newUser = await User.create({ name, email, password: encrpitedPassword });
    return res
      .status(201)
      .json({ success: true, message: "You are succesfully signup." });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong" });
  }
};
export default handler;
