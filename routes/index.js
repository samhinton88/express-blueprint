const mongoose = require('mongoose');

const User = require('../models/user');


module.exports = app => {

  app.delete('/api/users/:id/blueprints/:blueprintId/resources/:resourceName', async (req, res) => {
    if (
      req.params.blueprintId === 'undefined'
      || req.params.id === 'undefined'
      || req.params.resourceId) {

      res.sendStatus(500)
    }
    const {resourceName} = req.params

    const user = await User.findOne({ _id: req.params.id});



    const blueprint = user.blueprints.find((bp) => String(bp._id) === req.params.blueprintId)

    blueprint.resources = blueprint.resources.filter(r => {
      return JSON.parse(r).resourceName !== req.params.resourceName

    })


    console.log(blueprint.resources)


    await user.save()

    res.sendStatus(200)
  })

  app.post('/api/users/:id/blueprints/:blueprintId/resources', async (req, res) => {

    const user = await User.findOne({ _id: req.params.id });

    const {resourceAsString, refs} = req.body;

    const candidateBlueprint = user.blueprints.find((b) => String(b._id) === req.params.blueprintId)

    candidateBlueprint.resources.push(resourceAsString)

    if (refs) {

      candidateBlueprint.relatives.push(refs)
    }

    await user.save();

    res.send(JSON.parse(req.body.resourceAsString));
  })

  app.get('/api/users/:id', async (req, res) => {

    const user = await User.findOne({
      _id: req.params.id
    }).catch((err) => {
      console.log(err)
      res.send(err)
    });

    res.send(user);
  });

  app.post('/api/users/', async (req, res) => {

    const user = new User(req.body);
    user.blueprints.push({blueprintName: 'My First Blueprint', resources: ["{\"resourceName\": \"user\"}"]})
    await user.save();
    res.send(user);
  })


  app.post('/api/users/:id/blueprints/:blueprintId', async (req, res) => {

    const user = await User.findOne({ _id: req.params.id });

    const resourceAsString = JSON.stringify(req.body);

    user.blueprints.find((b) => String(b._id) === req.params.blueprintId).resources.push(resourceAsString)

    await user.save();

    res.send(user);
  })

  app.post('/api/users/:id/blueprints', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });

    user.blueprints.push(req.body);

    await user.save();

    res.send(req.body);
  })

  app.get('/api/users/:id/blueprints', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });


    res.send(user.blueprints);
  })
  // /api/users/5b1efedc4ac47082a45920cb/blueprints/5b1efedc4ac47082a45920cc



}


