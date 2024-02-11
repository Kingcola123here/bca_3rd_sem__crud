const express =require('express');
const mongoose =require('mongoose');
const cors =require('cors');
const bodyParser = require('body-parser');

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/bcacrud',{ useNewUrlParser: true, useUnifiedTopology: true });

let studentmanagement = mongoose.model('studentmanagement', {
    name:String,
    email:String,
    gender:String,
    course:[String],
    country:String,
    description:String
});



let app = express(); // instance create
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {  // => arrow function
    let data =await studentmanagement.find({})
        res.status(200).json(data);
});
app.get('/insert', async (req, res) => {  // => arrow function
    let data = {
        name:"Ram",
        email:"ram@gmail.com",
        gender:"Male",
        course:"HTML",
        country:"Nepal",
        description:"nepal"
        
    }
        let student = new studentmanagement(data);
        await student.save();
        res.status(200).json({message: "Data inserted"});
});

app.post('/submit-form', async(req, res) => {
    try{
    const  { name, email, gender, course, country, description }= req.body;
    const data_req = new studentmanagement({name, email, gender, course, country, description});
    await data_req.save();
    res.send('Form submitted successfully!');
    } catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(4000, ()=>{
    console.log('Server is running on port 4000');
});