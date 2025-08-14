const mongoose = require("mongoose")
require("dotenv").config()

const dataBase = async (req, res)=>{
    try {
      await mongoose.connect(process.env.MONGO_URL)  
      console.log("database connected")
    } catch (e) {
       console.error("something went wrong", e.message)
       process.exit(1)   
    }
}

module.exports = dataBase