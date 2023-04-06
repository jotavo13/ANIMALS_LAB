const {mongoose} = require("../db/connection");
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    species:String, 
    extinct: Boolean,
    location:String,
    lifeExpectancy:Number
})

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;