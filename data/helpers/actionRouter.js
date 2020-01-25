const express = require("express");
const Projects = require("./projectModel");
const Actions = require("./actionModel");

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

function errorHandler(error, req, res, next) {
  console.log("error: ", error);
  res.status(400).json({ message: error });
}

router.use(errorHandler);

module.exports = router;
