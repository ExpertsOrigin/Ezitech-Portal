const express = require("express")
const Connection = require("./connection/connection")
const router = require("./route/routes")
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());
app.use(router);




app.listen(4000, ()=>{
console.log("server is running on port 4000")
})