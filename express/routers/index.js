const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const app = express();

// body parser middleware is written before routes
app.use(bodyParser.urlencoded({ extended: true }));

// add product route
app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((res, next) => {
  res.status(404).send(`<html><body><h1>Page not Found</h1></body></html>`);
});

app.listen(4000);
