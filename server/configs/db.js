import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        mongoose.connection.on('connected',()=>console.log("MongoDB connected successfully"));
        await mongoose.connect(`${process.env.MONGODB_URI}/AI_blog`)
    } catch(error){
        console.error("Error connecting to MongoDB:", error.message);
    }

}

export default connectDB;