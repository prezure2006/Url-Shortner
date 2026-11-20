// connecting the database
import mongoose from "mongoose";
async function connectToMDBS(url) {
  try {
    return mongoose.connect(url);
  } catch (error) {
    console.log("Error connecting to the database");
  }
}
export default connectToMDBS;
