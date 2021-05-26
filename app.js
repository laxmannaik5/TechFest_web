const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/festDB", { useNewUrlParser: true, useUnifiedTopology: true });

const festSchema = new mongoose.Schema({
  username: String,
  password: String
});

const credSchema = new mongoose.Schema({
  fullname: String,
  branch: String
});

const Fest = new mongoose.model("Fest", festSchema);
const Cred = new mongoose.model("Cred", credSchema);


app.get("/", function(req, res){
  res.render("home");
});
app.get("/login", function(req, res){
  res.render("login");
});
app.get("/register", function(req, res){
  res.render("register");
});
app.get("/profile", function(req,res){
  res.render("profile");
});
app.get("/events", function(req, res){
  res.render("events");
});
app.get("/form", function(req, res){
  res.render("form");
});
app.get("/registerfail", function(req, res){
  res.render("registerfail");
});
app.get("/loginfail", function(req, res){
  res.render("loginfail");
});
app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  Fest.findOne({username: req.body.username}, function(err, foundItem){
    if(err){
      console.log(err);
    }else {
      if(foundItem){
        if(foundItem.password === password){
          res.redirect("/profile");

        }
        else {
          res.redirect("/loginfail");
        }
      }
    }
  });
});
app.post("/register", function(req, res){

Fest.find({username: req.body.username}, function(err, foundItem){
  if(foundItem.length === 0){
    const item = new Fest ({
      username: req.body.username,
      password: req.body.password
    });
    item.save();
    res.redirect("/profile");

   }
  else{
    res.redirect("/registerfail");
  }
});

});
app.post("/form", function(req, res){
  const list = new Cred ({
    fullname: req.body.fullname,
    branch: req.body.branch
  });
  list.save();
  res.redirect("profile");
});










app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
