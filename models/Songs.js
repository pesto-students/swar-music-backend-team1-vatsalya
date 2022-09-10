import mongoose from "mongoose";
const {Scheme} = mongoose;

const SongsSchmema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    language:{
        type:String,
        required: true
    },
    artist:{
        type:String,
        required: true
    },
    duration:{
        type:String,
        required: true
    },
    playList_id:{
        type:String,
        required: false
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    bucket:{
        type:String,
    }
},
{timestamps:true});
export default mongoose.model("Songs", SongsSchmema);