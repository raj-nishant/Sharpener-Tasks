const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  // Check the URL and send custom responses
  if (url === "/home") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome home\n");
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to About Us page\n");
  } else if (url === "/node") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my Node.js project\n");
  } else {
    // Handle other routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found\n");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
