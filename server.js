const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8000;


// dotenv file attached
require('dotenv').config();

// connect to mongodb
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("mongodb is connected sucessfully");
})
.catch(()=>{
    console.log("Failed to connect mongodb");
});


app.get('/home', (req,res)=> {
    res.send("Hello this is mukesh");
});

// created a PORT
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});