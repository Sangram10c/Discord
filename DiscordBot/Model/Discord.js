import mongoose from 'mongoose';

const DiscordSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    role:{
        type:String
    }

});
export default mongoose.model('Discord',DiscordSchema)