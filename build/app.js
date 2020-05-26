const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./Routes/users');

const app = express();

dotenv.config();
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://sdg:FDBtsCPnTGrutPqH@cluster0-0k1c8.mongodb.net/test?retryWrites=true&w=majority').then(() => console.log('MONGO Atlas is connected!')).catch(error => console.error(error.message));

// eslint-disable-next-line max-len
// this will help prevent cross origin issues that might arises from making HTTP calls from different servers
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', (req, res) => res.status(200).send({ message: 'YAY! Congratulations! Your first endpoint is working' }));
app.use('/api/users', users);

module.exports = app;