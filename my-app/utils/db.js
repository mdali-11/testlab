import mongoose from "mongoose";
const MONGOURI = process.env.MONGOURI;

export const connectDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.set('strictQuery', false);
  return mongoose
    .connect(MONGOURI)
    .then(() => {
      console.log("Database connection is done.");
    })
    .catch((err) => {
      console.log(err);
    });

  // try {
  //   // console.log("connection:", connection);
  //   // console.log("connection:", connection.readyState);

  //   if (connection.readyState >= 1) {
  //     console.log("Database already connected.");
  //     return;
  //   }

  //   const { connection } = await mongoose.connect(MONGOURI);

  //   if (connection.readyState === 1) {
  //     console.log("Database connection is done.");
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
};
