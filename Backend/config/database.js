import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Data base connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDB;
