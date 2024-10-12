import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL! as string);
    console.log("Database connected successfull....");
  } catch (error) {
    console.log(error);
  }
};
