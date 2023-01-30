import Exam from "@/models/test.model";
import User from "@/models/users.model";
import mongoose from "mongoose";
import { connectDatabase } from "../../../../utils/db";
import protectWith from "../../../middleware/protectWith";
import roleChecker from "../../../middleware/roleChecker";

connectDatabase();

const handler = async (req, res) => {
  let { test } = req.query;
  test = "63d5332c371a6af8b531c68c";

  //give test series Data according to user
  // const user = await User.find({
  //   _id: req.user._id,
  //   test_series: { $elemMatch: { _id: new mongoose.Types.ObjectId(test) } },
  // });

  const user = await User.findById(req.user._id);

  console.log("user:", user);
  let testSeries;

  if (!user.test_series) {
    return res.status(400).json({
      success: false,
      data: "You don't have test series in your account first buy test series",
    });
  }
  console.log(user.test_series);
  // user.test_series.map((item) => {
  //   console.log("item._id :", item._id);
  //   if (item._id === new mongoose.Types.ObjectId(test)) {
  //     console.log("object");
  //     testSeries = item;
  //   }
  // });

  res.status(201).json({
    success: true,
    data: testSeries,
  });
};

export default protectWith(roleChecker(handler, "user"));
// test_series: { $elemMatch: { _id: new mongoose.Types.ObjectId(test) } },
