import mongoose from "mongoose";
import validator from "validator";


const userSchema= new mongoose.Schema({

name:{

    type: String
    
},
phone:{
    type:Number
},

age:{
    type:Number
},

image:{

    data:String,
    contentType: String
},

})

const User= new mongoose.model('trial',userSchema)

export default User