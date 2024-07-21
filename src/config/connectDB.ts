import mongoose from "mongoose";
import env from "@/config/env";

const connectDB = async () => {
  try {
    await mongoose.connect(`${env.MONGODB_URL}/${env.DB_NAME}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      `DB connected successfully: DB HOST: ${connection.host}`;
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error: any) {
    console.log("DB Connection FAILED!", error.message);
    process.exit(1);
  }
};

export default connectDB;