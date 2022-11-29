const express = require("express");
const app = express();
const path = require("path")
const port = process.env.PORT || 3000;

// Connection to data base
require("./src/db/connect")

// Importing schema, It is a Class
const Register_Model = require("./src/models/loginModel")

//Serves static files (we need it to import a css file)
app.use(express.static('public'))

// In order to use template-engine
app.set("view engine", "hbs")
// Use this below two lines, when you don't views folder in your current directory 
const views_location = path.join(__dirname,"./views/layouts")
app.set("views", views_location)

// In order to solve this error, The partial navbar could not be found. We need to tell express that i am using partials now
// const hbs = require("hbs");
// const partials_location = path.join(__dirname, "../views/partials")
// hbs.registerPartials(partials_location)

// req.body can not work without of these two lines
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
    res.render("index")
    // res.render("index")
})

app.get("/singup", (req, res) => {
    // res.send("There is some technical essue, Server error")
    res.render("singup")
})

app.post("/signup", async (req, res) => {
    try{
        const registerUser = new Register_Model({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            cpassword : req.body.cpassword
        });
        await registerUser.save();
        res.status(201).render("index")

    }catch(err){
        res.status(400).send(err)
        console.log(err)
    }
})

app.get("/login", (req, res) => {
    res.render("login")
});

app.post("/login", async (req,res)=>{
    try {
        let email = req.body.email
        let password = req.body.password

        let userData= await Register_Model.findOne({email:email})
        
        if (userData.password == password ){
            res.status(200).render("index")
        }else{
            res.send("Invalid password")
        }
 

    } catch (error) {
        res.status(400).send("Invalid email")
        console.log(error)
    }
});

app.listen(port, () => {
    console.log("Server is running at port number ", port);
});