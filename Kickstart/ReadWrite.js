const fs = require("fs");
const http = require("http");
const url = require("url");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname === "/") {
    if (req.method === "GET") {
      // Read messages from the file
      fs.readFile("messages.txt", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error reading messages file");
          return;
        }

        // Split messages by newline and reverse the array to show the latest messages first
        const messages = data.trim().split("\n").reverse();

        // Display messages at the top of the form
        const html = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Message Form</title>
                    </head>
                    <body>
                        <form action="/add-message" method="post">
                            <textarea name="message" rows="4" cols="50"></textarea><br>
                            <input type="submit" value="Add Message">
                        </form>
                        <h2>Messages:</h2>
                        <ul>
                            ${messages
                              .map((message) => `<li>${message}</li>`)
                              .join("")}
                        </ul>
                    </body>
                    </html>
                `;

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
    } else if (req.method === "POST" && reqUrl.pathname === "/add-message") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const postData = querystring.parse(body);
        const newMessage = postData.message;

        if (!newMessage) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Message cannot be empty");
          return;
        }

        // Read existing messages from the file
        fs.readFile("messages.txt", "utf8", (err, data) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error reading messages file");
            return;
          }

          // Add the new message to the existing messages
          const updatedMessages = `${newMessage}\n${data}`;

          // Write the updated messages back to the file
          fs.writeFile("messages.txt", updatedMessages, "utf8", (err) => {
            if (err) {
              console.error(err);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Error writing messages file");
              return;
            }

            // Redirect to the home page to display updated messages
            res.writeHead(302, { Location: "/" });
            res.end();
          });
        });
      });
    } else {
      // Handle other paths/methods
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
