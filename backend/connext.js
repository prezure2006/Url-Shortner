import mongoose from "mongoose";
async function connectToMDBS(url) {
  return mongoose.connect(url);
}
export default connectToMDBS;
