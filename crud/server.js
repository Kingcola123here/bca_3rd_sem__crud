let express = require('express'); //package call
let mongoose = require('mongoose');
let cors =require('cors');

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/bcacrud');

let Student = mongoose.model('Student', {
    name:String,
    email:String,
    address:String
});



let app = express(); // instance create
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {  // => arrow function
    let data =await Student.find({})
        res.status(200).json(data);
});
app.get('/insert', async (req, res) => {  // => arrow function
    let data = {
        name:"raj",
        email:"raj@gmail.com",
        address:"ktm"
    }
        let student = new Student(data);
        await student.save();
        res.status(200).json({message: "Data inserted"});
});

app.post('/', async(req, res) => {
    const sR = new Student(req.body);
    await sR.save();
    return res.status(201).send(sR);
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});