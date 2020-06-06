// import express from 'express';
const express = require('express');
const User = require('../Models/User');
const Farmer = require('../Models/farmer');
const farmerInputValidation = require('../Middlewares/farmerValidation');


const router = express.Router();

/**
 * @description POST api/farmer route
 * @access  public
 */
router.post('/farmer', (req, res) => {
  const { errors, isValid } = farmerInputValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }


  const newFarmer = new Farmer({
    FarmerName: req.body.FarmerName,
    FarmerDescription: req.body.FarmerDescription,
    FarmerAddress: req.body.FarmerAddress
  });

  newFarmer
    .save()
    .then((farmer) => res.status(200).json(farmer))
    .catch((err) => res.status(500).json({ err }));
});


/**
 * @description GET api/farmer/:users_id route
 * get farmer by user id
 * @access  public
 */

router.get('/users/users_id', (req, res) => {
  const errors = {};
  Farmer.findOne({ user: req.params.users_id, _id: req.params.id })
    .then((farmer) => {
      if (!farmer) {
        errors.findagent = 'no farmer found';
        return res.status(404).json(errors);
      }
      return res.json({ farmer });
    })
    .catch((err) => res.status(400).json(err));
});

/**
 * @description GET api/farmer/all  get all profile route
 * @access  public
 *
 * @return json object
 */
router.get('/farmer/all', (req, res) => {
  const errors = {};
  Farmer.find()
    .then((farmers) => {
      if (!farmers) {
        errors.findfarmer = 'There are no farmers';
        return res.status(404).json(errors);
      }
      return res.json(farmers);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/farmer/:user_id', (req, res) => {
  const errors = {};
  Farmer.findOneAndDelete()
    .then((farmer) => {
      if (!farmer) {
        errors.deletefarmer = 'There is no agent to delete';
        return res.status(404).json(errors);
      }
      return res.json(farmer);
    })
    .catch((err) => res.status(500).json(err));
});
module.exports = router;
