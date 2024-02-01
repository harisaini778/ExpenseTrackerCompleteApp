// controllers/userControllers.js

const bcrypt = require('bcrypt');
const userModel = require('../models/userModels');

const saltRounds = 10; 

exports.signup = (req, res) => {
  const { username, password, email, premium } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    } else {
      userModel.query(
        'INSERT INTO myusers (username, password, email, premium) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, email, premium],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
          } else {
            res.json({ message: 'User registered successfully' });
          }
        }
      );
    }
  });
};

exports.login = (req, res) => {
  const { email, password, premium } = req.body;

  userModel.query(
    'SELECT * FROM myusers WHERE email = ? AND premium = ?',
    [email, premium],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } else if (results.length > 0) {
        // Compare the hashed password with the input password
        bcrypt.compare(password, results[0].password, (err, passwordMatch) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
          } else if (passwordMatch) {
            res.json({ message: 'Login successful' });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );
};
