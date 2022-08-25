
import mongoose from "mongoose";
import multer from "multer";

const url="mongodb://localhost:27017/multer"

mongoose.connect(url)

const db=mongoose.connection

export default db;

console.log(("successfully connect to mongo"));

