


const express = require('express')
const cors = require('cors')
const { UserModel } = require('./model/userModel')
const { connection } = require('./config/db')

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
 res.send("wel come to service website")   
})


app.get("/users", async (req, res) => {
    try {
let user=await UserModel.find()
res.send(user)
     } catch (err) {
        res.send({"msg":"somthing went wrong! cannot Get User Data","error":err.message})

      }


})

app.get("/users/:id", async (req, res) => {
    const id=req.params.id
    console.log(id)
    try { 
       let one= await UserModel.find({"_id":id})
       res.send(one)
    } catch (err) { 
        res.send({"msg":"somthing went wrong! cannot Get User Data","error":err.message})
    }


})

app.post("/users", async (req, res) => {
    const data = req.body
    console.log(data)

    try {
        const newData = new UserModel(data)
        await newData.save()
        res.send({"msg":"User added successfully"})
  } catch (err) {
    res.send({"msg":"somthing went wrong! cannot add new user ","error":err.message})
    }


})


app.put("/users/:id", async (req, res) => {
    const data=req.body
    const id=req.params.id
    console.log(data,id)
    try { 
let newData=await UserModel.findOneAndUpdate({"_id":id},data)
res.send({"msg":"User data has been updated"})
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot update user data ","error":err.message})
     }


})


app.delete("/users/:id", async (req, res) => {
    const id=req.params.id
    try { 
    let data=await UserModel.findOneAndDelete({"_id":id})
    res.send({"msg":"User data has been updated"})
    } catch (err) {
        res.send({"msg":"somthing went wrong! cannot delete user ","error":err.message})
     }

})





app.listen(8122, async () => {
    try {
        await connection
        console.log("db connected successfully")
    } catch (err) {
        console.log("connection failed")
    }
    console.log(`server running on port `)
})