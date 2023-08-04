

const express = require(`express`)
const { ServiceModel } = require("../model/serviceModel")
const serviceRouter = express.Router()


serviceRouter.get("/", (req, res) => {
    res.send("welcome to service router")

})



serviceRouter.post("/newservice", async (req, res) => {
    console.log(req.body)
    let data = req.body
    try {
        const newData = new ServiceModel(data)
        await newData.save()
        res.send({ "msg": "Service added successfully" })

    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot add services", "error": err.message })
    }


})


serviceRouter.get("/getall", async (req, res) => {

    try {

        let allData = await ServiceModel.find()
        res.send(allData)

    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot Get User Data", "error": err.message })
    }

})


serviceRouter.patch("/update/:id", async (req, res) => {

    const id = req.params.id
    console.log(id)
    const data = req.body
    try {

        let allData = await ServiceModel.updateOne({ _id: id }, data)
        res.send({ "msg": "Service status has been updated" })
        console.log(allData)
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot update service Data", "error": err.message })
    }

})


serviceRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    try{
        let data=await ServiceModel.findOneAndDelete({_id:id})
        res.send({ "msg": "service has been deleted" })
    }catch(err){
        res.send({ "msg": "somthing went wrong! cannot delete service ", "error": err.message })
    }    
})









module.exports = {
    serviceRouter
}