const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');
const port = 2222;
const app = express()

app.use(cors())
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json())

const route = require('./route/web')
app.use("/api",route)

const dbDriver = "mongodb+srv://shrutiranjan:RTXuptQMJxKWh8Jb@cluster0.adj4oir.mongodb.net/Auth_jwt_api"
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
    app.listen(port,()=>{
        console.log("db connect");
        console.log(`server running port http://localhost:${port}`);
    })
}).catch((err)=>{
    console.log(err);
})