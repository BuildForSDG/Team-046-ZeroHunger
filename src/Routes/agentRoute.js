// import express from 'express';
const express = require('express');
const User = require('../Models/User');
const Agent = require('../Models/agent');
const agentValidation = require('../Middlewares/agentValidation');


const router = express.Router();

/**
 * @description POST api/agent route
 * @access  public
 */
router.post('/agent', (req, res) => {
  const { errors, isValid } = agentValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }


  const newAgent = new Agent({
    CompanyName: req.body.CompanyName,
    CompanyDescription: req.body.CompanyDescription,
    CompanyAddress: req.body.CompanyAddress
  });

  newAgent
    .save()
    .then((agent) => res.status(200).json(agent))
    .catch((err) => res.status(500).json({ err }));
});


/**
 * @description GET api/agent/:users_id route
 * get agent by user id
 * @access  public
 */

router.get('/users/users_id', (req, res) => {
  const errors = {};
  Agent.findOne({ user: req.params.users_id, _id: req.params.id })
    .then((agent) => {
      if (!agent) {
        errors.findagent = 'no agent found';
        return res.status(404).json(errors);
      }
      return res.json({ agent });
    })
    .catch((err) => res.status(400).json(err));
});

/**
 * @description GET api/agent/all  get all profile route
 * @access  public
 *
 * @return json object
 */
router.get('/agent/all', (req, res) => {
  const errors = {};
  Agent.find()
    .then((agents) => {
      if (!agents) {
        errors.findagent = 'There are no agent';
        return res.status(404).json(errors);
      }
      return res.json(agents);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/agent/:user_id', (req, res) => {
  const errors = {};
  Agent.findOneAndDelete()
    .then((agent) => {
      if (!agent) {
        errors.deleteagent = 'There is no agent to delete';
        return res.status(404).json(errors);
      }
      return res.json(agent);
    })
    .catch((err) => res.status(500).json(err));
});
module.exports = router;
