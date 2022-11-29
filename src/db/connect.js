let mangoose = require("mongoose");
let url = "mongodb://127.0.0.1:27017/new";

mangoose.connect(url,(err)=>{
    if (err) console.log("Unable to connect",err);
    else console.log("MongoDB connected");
  })