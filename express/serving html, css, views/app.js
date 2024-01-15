const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactRoutes = require("./routes/contact");

// express is a function which we run and store it in app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// for adding folder to grant read access
app.use(express.static(path.join(__dirname, "public")));

// add product route
app.use("/admin", adminRoutes);
// contact route
app.use(contactRoutes);

//   "/" page
app.use(shopRoutes);

// 404 page
app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "views", "404PageNotFound.html"));
});

app.listen(4000);
