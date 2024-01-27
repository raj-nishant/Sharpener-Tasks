const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// for login page
app.get("/", (req, res, next) => {
  res.send(`
    <html>
      <head>
        <title>Login Page</title>
      </head>
      <body>
        <form onsubmit="localStorage.setItem('loginUsr', document.getElementById('loginUsr').value)" action="/home">
          <input id="loginUsr" type="text" placeholder="Enter your Login Id"/>
          <button type="submit">Login</button>
        </form>
      </body>
    </html>
    `);
});

// for home page
app.get("/home", (req, res, next) => {
  var all_msg = "";
  fs.readFile("msg.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const data_arr = data.split("__");
      data_arr.forEach((text, index) => {
        all_msg = all_msg + "   " + text;
      });

      res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Home Page</title>
      </head>
      <body>
        <h2>${all_msg}<h2>
        <form onsubmit="document.getElementById('UserName').value = localStorage.getItem('loginUsr')" action="/message" method="post">
          <input type="text" name="msg" placeholder="Enter your Msg"/>
          <input type="hidden" id="UserName" name="usr" placeholder="UserName"/>
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
    `);
    }
  });
});

// for msg redirect request
app.post("/message", (req, res, next) => {
  res.statusCode = 302;
  fs.appendFile(
    "msg.txt",
    "__" + `${req.body.usr}:${req.body.msg}`,
    "utf8",
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/home");
      }
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
