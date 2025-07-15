const mongoose= require('mongoose');

require("dotenv").config();

exports.connect =()=>{
    mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Connected to DB:", mongoose.connection.name);
})
.catch((error)=>{
    console.log("error connecting to db")
    console.log(error);
    process.exit(1);
})
};