const mongoose = require('mongoose');

// Connected to mongodb server

mongoose.connect("mongodb://127.0.0.1:27017/w3villa")
.then(() => console.log("Connection Successfull"))
.catch((err) => console.log(err));


// Schema Creation

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    PhoneNo: Number,
    tasks:[{
            todo: String,
        },]
})

// Model Creation
const User = mongoose.model('User', userSchema);
module.exports = User;