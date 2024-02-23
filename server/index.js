const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 8080;

const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
},{
    timestamps : true //With timestamps: true, if you create a new document and save it to the MongoDB database, Mongoose will automatically add createdAt and updatedAt fields to that document, populating them with the current date and time. If you subsequently update that document and save it again, Mongoose will automatically update the updatedAt field with the current date and time.
})
const userModel = mongoose.model("user",schemaData)

//read data
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true ,data : data})
})

//create data
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true,message : "data save successfully",data : data})
})

//update data
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest} = req.body;

    console.log(rest)
    const data = await userModel.updateOne({ _id : _id},rest)
    res.send({success : true,message : "data update successfully", data : data})
})

//delete
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true,message : "data deleted successfully", data : data})
})


mongoose.connect("mongodb://127.0.0.1:27017/curdoperation")
.then(()=>{
    console.log("Connected to Database")
    app.listen(PORT,()=>console.log("Server is running...."))
})
.catch((err)=>console.log(err))
