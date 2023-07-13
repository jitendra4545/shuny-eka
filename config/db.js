

const mongoose=require('mongoose')



const connection=mongoose.connect("mongodb+srv://jitendra:jitendrakumarghadei@cluster0.e4vb2oc.mongodb.net/placement?retryWrites=true&w=majority")


module.exports={
    connection
}