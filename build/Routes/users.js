import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User';
import userInputValidation from '../Middlewares/register';
import loginValidation from '../Middlewares/login';

const router = express.Router();

/**
 * @description POST api/user/register route
 * @access  public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = userInputValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
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
        newUser.save().then(user => res.status(200).json(user)).catch(err => res.status(500).json({ err }));
      });
    });
  });
});