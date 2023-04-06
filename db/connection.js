// import mongoose
const mongoose = require("mongoose");
require("dotenv").config();

//connect mongoose woth mongoDB url
mongoose.connect(process.env.DATABASE_URL);

// export mongoose so that models can interface with it
module.exports= {mongoose};