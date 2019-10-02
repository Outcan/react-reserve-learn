import mongoose from "mongoose";

//const connection = {};
let isConnected;

async function connectDb() {
  //console.log("Connection Old: ", connection);
  try {
    if (isConnected) {
      // Use existing database connection
      console.log("Using existing database connection");
      return;
    }
    // Use new database connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Using new DB Connected!");
    //connection.isConnected = db.connections[0].readyState;
    isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("DB Connection Error", error.message);
  }
}

export default connectDb;
