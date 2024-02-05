let express = require('express'); //package call
let mongoose = require('mongoose');
const bodyParser = require('body-parser');


const path = require('path');




mongoose.connect('mongodb://127.0.0.1:27017/bcacrud',{ useNewUrlParser: true, useUnifiedTopology: true });

let User = mongoose.model('User', {
    name:String,
    email:String,
    address:String
});

let app = express(); // instance create

const template_path = path.join(__dirname, './views/');
app.set('view engine', 'ejs');
app.set('views', template_path);

app.use(bodyParser.urlencoded({ extended: true }));





app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());





app.post('/submit-form', async(req, res) => {
    try {
        // Extract data from the form
        const { name, email, address } = req.body;
    
        // Create a new FormData document
        const user = new User({ name, email, address });
    
        // Save the data to the MongoDB collection
        await user.save();
    
        // Send a user-friendly response
        res.send('Form submitted successfully!');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});


app.get('/', async (req, res) => {
   try {
        let data = await User.find({});
        res.render('index1.ejs', { users: data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(4000, ()=>{
    console.log("Server is running on port 4000");
})