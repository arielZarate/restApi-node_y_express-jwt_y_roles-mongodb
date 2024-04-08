import mongoose from "mongoose";

const dbConnect = async () => {
  let db = null;

  try {
    if (db) {
      return;
    }

    //URI_DB=mongodb://localhost:27017/[nombre de proyecto]
    db = await mongoose.connect(process.env.URI_MONGO);

    console.log("DB conected with MongoDB 😎🚀🚀🚀");
    return db;
  } catch (error) {
    console.error("Error in conected  MongoDB 😥", {
      error: error.message,
      status: 500,
    });
  }
};

export default dbConnect;
