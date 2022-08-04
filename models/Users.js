import mongoose from "mongoose";
const {Scheme} = mongoose;

const UsersSchmema = new mongoose.Schema({
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
    }
},
{timestamps:true});
export default mongoose.model("Users", UsersSchmema);