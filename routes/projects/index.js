const router         = require('express').Router();

// Require the ProjectController
const controller     = require('./../../controller/project');

router.route('/')

  .get((req, res) => {
    const projects = controller.index(req, res).next().value;

    res.status(200).json(projects);

  });

router.route('/:id')

  .get((req, res) => {
    const project = controller.findProject(req, res).next().value;

    project.then(result => {
      res.status(200).json(result);
    }).catch(err => {
      res.status(500).json({"message": "Couldn't fetch projects"});
    });
  });

module.exports = router;
