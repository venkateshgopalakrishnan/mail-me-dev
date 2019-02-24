const express = require("express");
const mongoose = require('mongoose')
const keys = require("./config/keys");



mongoose.connect(keys.mongoURI)

const app = express();
require('./routes/authRoutes')(app)
// require models before passport, else schema wont be registered
require('./models/Users')
require('./services/passport');

const PORT = process.env.PORT || 5000;
app.listen(PORT);
