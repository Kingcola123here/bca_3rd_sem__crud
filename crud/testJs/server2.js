const express =require('express');
const mongoose =require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/bcacrud');

let User =mongoose.model('User', {
    name:String,
    email:String,
    address:String,
    phone:Number
});

let app=express();
app.use(express.json());
app.use(cors());

app.get('/', async (req,res) => {
    let data =await User.find({})
    res.status(200).json(data);
})

app.post('/', async(req,res)=> {
    const sR =new User(req.body);
    await sR.save();
    return res.status(201).send(sR);
})

app.listen(4000, ()=> {
    console.log("Server is running on port 4000");
})

