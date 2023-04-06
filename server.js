require('dotenv').config();
const express = require("express");
const app = express();
const {mongoose} = require("mongoose");
const methodOverride = require("method-override");
const { PORT, DATABASE_URL } = require("./config.js");


const Animal = require("./models/animal.js")

app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

// DEFAULT/INDEX of all animals
app.get("/animals", async (req, res)=>{
    const animals = await Animal.find({})
    res.render("index.ejs", {animals})
})
// CREATE an animal on this page
app.get("/animals/new", (req, res)=>{
    res.render("new.ejs")
})

//EDIT an animal
app.get("/animals/edit/:id", async (req, res)=>{
    const animal = await Animal.findById(req.params.id);
    res.render("edit.ejs", {animal})
})

// UPDATE send the updated animal to the DB
app.put("/animals/:id", async (req, res)=>{
    const id = req.params.id;
    req.body.extinct = req.body.extinct === "on" ? true:false;
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.redirect("/animals")
})

// SHOW ONE animal
app.get("/animals/:id", async (req, res)=>{
   const animal = await Animal.findById(req.params.id);
   res.render("show.ejs", {animal})
})


// POST send the new animal to the DB
app.post("/animals", async (req, res)=>{
    req.body.extinct = req.body.extinct === "on" ? true : false;
    const animal = await Animal.create(req.body);
    res.redirect("/animals")
})

app.delete("/animals/:id", async (req, res)=>{
    const animal = await Animal.findByIdAndDelete(req.params.id)
    res.redirect("/animals")
})

mongoose.connect(DATABASE_URL).then(
    ()=>{
        app.listen(PORT, ()=> console.log(`express is listening on port ${PORT}`))
    }
)