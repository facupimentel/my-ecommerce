import { connect } from "mongoose";

const connectMongo = async ()=>{
    try {
        connect(process.env.MONGO)
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectMongo