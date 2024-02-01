// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userControllers');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/signup', userController.signup);
app.post('/login', userController.login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

