const express = require("express");
const routes = express.Router();
const path = require("path");

routes.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, ".." , "views", "shop.html"))
})

module.exports = routes;