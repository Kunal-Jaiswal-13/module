const fs = require("fs");
const os = require("os");
const http = require("http");
const path = require("path");
const url = require("url");

http
  .createServer((req, res) => {
    if (req.method == "GET" && req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("hello world");
    } else if (req.method == "POST" && req.url == "/data") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const parsedData = JSON.parse(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "data  recieved", data: parsedData })
        );
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("not found");
    }
  })
  .listen(9100);
