const express = require("express");
const Projects = require("./projectModel");
const Actions = require("./actionModel");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then(list => {
      if (list) {
        res.status(200).json(list);
      } else {
        next("There are no actions to list");
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  if (id) {
    Actions.get(id)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          next("An action with that id does not exist");
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  } else {
    next("Please enter a valid actions ID");
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  if (id) {
    Actions.get(id)
      .then(action => {
        if (!action) {
          next("An action with that id does not exist");
        } else {
          Actions.remove(id).then(count => {
            if (count) {
              res.status(200).json(`Removed ${count} action from the database`);
            } else {
              next("There was a problem removing the action");
            }
          });
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  let newAction = req.body;
  // newAction = { project_id: id, ...newAction };
  descLength = newAction.description.length;
  if (!newAction.project_id) {
    next("A valid project ID is required");
  } else if (!newAction.description || !newAction.notes) {
    next("Action description and notes are required");
  } else if (descLength > 128) {
    next("You exceeded the maximum description length of 128 characters.");
  } else {
    if (id) {
      Actions.get(id)
        .then(action => {
          if (action) {
            Actions.update(id, newAction)
              .then(item => {
                if (item) {
                  res.status(201).json(item);
                }
              })
              .catch(err => {
                res.status(500).json(err.message);
              });
          } else {
            next("A valid project ID is required");
          }
        })
        .catch(err => {
          res.status(500).json(err.message);
        });
    } else {
      next("A valid actions ID is required");
    }
  }
});

function errorHandler(error, req, res, next) {
  console.log("error: ", error);
  res.status(400).json({ message: error });
}

router.use(errorHandler);

module.exports = router;
