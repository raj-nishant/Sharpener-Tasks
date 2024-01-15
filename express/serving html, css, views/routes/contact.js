const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/contactUS", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "views", "contactUS.html"))
});

router.post("/success", (req, res, next) => {
    fs.appendFile("contactedUsr.txt",(`${req.body.ContactName}`+`${req.body.ContactEmail}`+"____"), (err) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, "..", "views", "formSucess.html"))
        }
    })
})

module.exports = router;