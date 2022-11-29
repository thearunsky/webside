const mongoose = require("mongoose")


const schema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type:String
    },
    cpassword : {
        type:String
    }
})

// Create collection

const Register = new mongoose.model("User",schema)


module.exports= Register;