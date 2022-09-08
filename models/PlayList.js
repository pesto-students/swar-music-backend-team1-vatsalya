import mongoose from "mongoose";
const {Scheme} = mongoose;

const PlayListSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:false
    },
    is_active:{
        type:Boolean,
        required: false
    },
    songs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Songs'
        }
    ]
},
{timestamps:true});
export default mongoose.model("PlayList", PlayListSchema);