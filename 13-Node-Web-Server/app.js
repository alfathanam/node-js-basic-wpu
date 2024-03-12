const http = require("http");
// console.log(http);
const fs = require("fs");

//todo Abstraction
const renderHtml = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("File not found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

const port = 3000;

// Todo Create Web Server Having 2 param , request and response
// Todo This way is manual and if only statis page and for learn before using express

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  const url = req.url;
  //   console.log(url);

  if (url === "/contacts") {
    renderHtml("./contacts.html", res);
  } else if (url === "/abouts") {
    renderHtml("./abouts.html", res);
  } else {
    renderHtml("./index.html", res);
  }
});

server.listen(port, () => {
  console.log(`Server already running on port : ${port}`);
});
