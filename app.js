const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');



// Routes
const photos = require('./routes/photos');
const articles = require('./routes/articles');

// DB
const database = require('./config/db')


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/photos', photos);
app.use('/articles', articles);
app.use('/', (req,res,next) => {
    res.send("Hello World!")
})
app.use('/*',(req,res,next) => {
    res.json("404 - Not found ;)")
})

// LOAD
database.load();


//Start 

const PORT = process.env.PORT || 2531
//listen 
app.listen(PORT, () => console.info(`Started on port ${PORT}`));
