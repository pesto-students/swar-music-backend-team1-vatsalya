import mongoose from "mongoose";
const {Schema} = mongoose;

const UsersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    confirmPassword:{
        type:String,
        required: true
    },
    DOB:{
        type: Date,
        required:false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    gender: {
        type:String,
        required:false
    },
    feedBack: {
        type:String,
        required:false
    },
    country:{
        type:String,
        required:true
    }
},
{timestamps:true});
export default mongoose.model("Users", UsersSchema);