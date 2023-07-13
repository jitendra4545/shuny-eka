const mongoose=require('mongoose')



const UserSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:Number}
},{
    versionKey:false
})


const UserModel=mongoose.model("users",UserSchema)


module.exports={
    UserModel
}


