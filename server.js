const express = require("express");
const actionRouter = require("./data/helpers/actionRouter");
const projectRouter = require("./data/helpers/projectRouter");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(express.json(), helmet(), cors(), logger);

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Hello World - Denton Warnock</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.method} Request to ${req.url} at [${new Date().toISOString()}]`
  );
  next();
}

module.exports = server;
