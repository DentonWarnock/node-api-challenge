const express = require("express");
const Projects = require("./projectModel");
const Actions = require("./actionModel");

const router = express.Router();

router.post("/", (req, res, next) => {
  const newProject = req.body;
  if (!newProject.name || !newProject.description) {
    next("Name and Description are required");
  } else {
    Projects.insert(newProject)
      .then(item => {
        if (item) {
          res.status(201).json(item);
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }
});

router.post("/:id/actions", (req, res) => {});

router.get("/", (req, res) => {
  Projects.get()
    .then(list => {
      if (list) {
        res.status(200).json(list);
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  if (id) {
    Projects.get(id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          next("A project with that id does not exist");
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }
});

router.get("/:id/actions", (req, res, next) => {
  const { id } = req.params;
  if (id) {
    Projects.get(id)
      .then(project => {
        if (!project) {
          next("A project with that id does not exist");
        } else if (project.actions) {
          res.status(200).json(project.actions);
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

function errorHandler(error, req, res, next) {
  console.log("error: ", error);
  res.status(400).json(error);
}

router.use(errorHandler);

module.exports = router;
