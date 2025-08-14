
require("dotenv").config()
const app = require("./app")

require("dotenv").config

const dataBase = require("./database/database") //database

PORT = process.env.PORT || 5000


const startServer = async ()=>{
    await dataBase();
    app.listen(PORT, ()=>{
    console.log(`server is now listening on port ${PORT}`)
})   
}
startServer()
