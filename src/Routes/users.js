// import express from 'express';
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const userInputValidation = require('../Middlewares/register');
const loginValidation = require('../Middlewares/login');


const router = express.Router();

/**
 * @description POST api/users/register route
 * @access  public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = userInputValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exist' });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.status(200).json(user))
          .catch((err) => res.status(500).json({ err }));
      });
    });
  });
});

/**
 * @description POST api/users/login route
 * @access  public
 */
router.post('/login', (req, res) => {
  const { errors, isValid } = loginValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'Username or password is Incorrect' });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res
            .status(400)
            .json({ status: 'fail', msg: 'Username or password is Incorrect' });
        }
        const payload = {
          id: user.id,
          user: user.name
        };
        jwt.sign(
          payload,
          'testing',
          { expiresIn: 3600 },
          (err, token) => {
            res.status(200).json({
              status: 'success',
              token: `Bearer ${token}`
            });
          }
        );
      });
    })
    .catch((err) => res.status(500).json({ err }));
});

module.exports = router;
