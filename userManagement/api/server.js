const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app=express();

mongoose.connect('mongodb://127.0.0.1:27017/bcacrud');
let user = mongoose.model('hello', {
    name:String,
    email:String,
});

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {  // => arrow function
    let users =await user.find({});
    return res.json({users});
});

app.post('/', async(req, res) => {
    const sR = new user(req.body);
    await sR.save();
    return res.json({message:"User created!"});
});

app.delete('/:id', async (req,res)=>{
    let id = req.params.id;
    await user.deleteOne({_id:id});
    return res.json({message: 'User deleted'});
})


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});