const http = require("http");
const express = require("express");

// express is a function which we run and store it in app
const app = express();

// req and res are same
// next is function called to pass the compiler to next to
app.use((req, res, next) => {
  console.log("I am first middleware");
  next();
});
app.use((req, res, next) => {
  res.send("<h1>Page 1</h1>");
  console.log("I am second middleware");
});

app.listen(4000);
