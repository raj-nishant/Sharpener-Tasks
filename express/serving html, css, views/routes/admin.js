const express = require("express");
const path = require("path");
const routes = express.Router();


routes.get("/add-product", (req, res, next) => {
    console.log("Add product page");
    res.sendFile(path.join(__dirname,"../","views","add-product.html"))
})
routes.post("/message", (req, res, next) => {
    console.log(req.body.title);
    console.log(req.body.size);
    res.redirect("/");
})
module.exports = routes;