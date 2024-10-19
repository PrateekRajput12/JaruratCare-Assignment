const mongoose=require("mongoose")

const service=new  mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase: true
    },
    description:{
        type:String,
        lowercase:true
    },
    price:{
        type:Number,
        required:true
    }
})



module.exports=mongoose.model("Service",service)
