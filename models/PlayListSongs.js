import mongoose from "mongoose";
const {Schema} = mongoose;

const PlayListSongsSchema = new mongoose.Schema({  
    playList_id:{
        type:String,
        required:false
    },
   
    song_id:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    }

},
{timestamps:true});
export default mongoose.model("PlayListSongs",PlayListSongsSchema);