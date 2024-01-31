import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

export const initMongoDB = async () => {
    mongoose.Promise = Promise;
    mongoose
        .connect(process.env.MONGO_URL as string)
        .then(() => console.log("DB Connected!"));

    mongoose.connection.on("error", (error: Error) =>
        console.log("mongoose error", error)
    );
};
