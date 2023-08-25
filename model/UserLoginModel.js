const { default: mongoose } = require("mongoose");




const UserSchema=mongoose.Schema({
    name:String,
    email:String
    
},
{
    versionKey:false,
    timestamps:true
})


const UserDataModel=mongoose.model("studentdetail",UserSchema)


module.exports={
    UserDataModel
}