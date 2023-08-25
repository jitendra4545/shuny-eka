


const express = require('express')
const cors = require('cors')
const { UserModel } = require('./model/userModel')
const { connection } = require('./config/db')
const { serviceRouter } = require('./routes/serviceRoute')
const jwt=require('jsonwebtoken')
const { UserDataModel } = require('./model/UserLoginModel')
const app = express()
app.use(express.json())
app.use(cors())
app.use("/service",serviceRouter)
app.get("/", async (req, res) => {
    try {
      let allData = await UserDataModel.find()
      res.send(allData)
    } catch (err) {
      res.send({ "msg": "somthing went wrong! cannot get data", "error": err.message })
    }
  })

  app.post("/adduser", async (req, res) => {
    let userData = req.body
  
    try {
      let newUser = new UserModel(userData)
      if (userData.name != "" && userData.email != "") {
        await newUser.save()
        jwt.sign({ jitendra: 'ghadei' }, userData.email, async function (err, token) {
          console.log(token);
          res.send({ "msg": "Login Successfull", "token": token })
        })
  
      } else {
        console.log({ "msg": "somthing went wrong! cannot generate token" })
      }
    } catch (err) {
      res.send({ "msg": "somthing went wrong! cannot add", "error": err.message })
    }
  })
  



app.get("/users", async (req, res) => {
    try {
        let user = await UserModel.find()
        res.send(user)
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot Get User Data", "error": err.message })

    }


})

app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        let one = await UserModel.find({ "_id": id })
        res.send(one)
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot Get User Data", "error": err.message })
    }


})

app.post("/users", async (req, res) => {
    const data = req.body
    console.log(data)

    try {
        const newData = new UserModel(data)
        await newData.save()
        res.send({ "msg": "User added successfully" })
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot add new user ", "error": err.message })
    }


})


app.put("/users/:id", async (req, res) => {
    const data = req.body
    const id = req.params.id
    console.log(data, id)
    try {
        let newData = await UserModel.findOneAndUpdate({ "_id": id }, data)
        res.send({ "msg": "User data has been updated" })
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot update user data ", "error": err.message })
    }


})


app.delete("/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        let data = await UserModel.findOneAndDelete({ "_id": id })
        res.send({ "msg": "User data has been updated" })
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot delete user ", "error": err.message })
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