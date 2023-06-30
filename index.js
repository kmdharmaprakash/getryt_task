const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const indexRoute = require("./routes/index");
const expressValidator = require('express-validator')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(expressValidator())

// database connection
const dbUrl = "mongodb://localhost:27017/interview";
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(dbUrl, connectionParams).then(() => {
    console.log("DB Connected")
}).catch(() => {
    console.log("DB Not Connected")
})

// Route connection
app.use('/api', indexRoute);

//Server connection
app.listen(process.env.PORT, (err) => {
    if(!err) {
        console.log(`Server connected on the port no ${process.env.port}`)
    } else {
        console.log("Error on Server connection")
    }
})

