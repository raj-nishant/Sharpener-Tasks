const express = require("express");
const bodyParser = require("body-parser");

// express is a function which we run and store it in app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/", (req, res, next) => {
  console.log("Page is working");
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send(`
        <html>
            <body>
                <form action="message" method="POST">
                    <input type="text" name="title" placeholder="Enter your product"/>
                    <input type="number" name="size" placeholder="product size"/>
                    <button type="submit">Add to Cart</button>
                </form>
            </body>
        </html>
    `);
});
app.post("/message", (req, res, next) => {
  console.log(req.body.title);
  console.log(req.body.size);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("This is Home page..");
});

app.listen(4000);
