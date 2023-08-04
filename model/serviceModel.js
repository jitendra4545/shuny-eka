const { default: mongoose, model } = require("mongoose");


const ServiceSchema=mongoose.Schema({
first_name:{type:String,required:true},

father_name:{type:String,required:true},
mobile:{type:Number,required:true},
address:{type:String,required:true},
product:{type:String,required:true},
product_brand_Model:{type:String,required:true},
pincode:{type:Number,required:true},
issue_details:{type:String,required:true},
status:{type:String,default:"pending"}
},{
    versionKey:false,
    timestamps: true
})

const ServiceModel=mongoose.model("services",ServiceSchema)


module.exports={
    ServiceModel
}





