// controllers/expenseController.js

const userModel = require('../models/userModels');

exports.getExpenses = (req, res) => {
  const userId = req.user.id; 

  userModel.query(
    'SELECT * FROM expenses WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.json(results);
      }
    }
  );
};

exports.addExpense = (req, res) => {
  const { category, amount, description, date } = req.body;
  const userId = req.user.id; 

  userModel.query(
    'INSERT INTO expenses (user_id, category, amount, description, date) VALUES (?, ?, ?, ?, ?)',
    [userId, category, amount, description, date],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.json({ message: 'Expense added successfully' });
      }
    }
  );
};

exports.editExpense = (req, res) => {
  const { id, category, amount, description, date } = req.body;

  userModel.query(
    'UPDATE expenses SET category=?, amount=?, description=?, date=? WHERE id=?',
    [category, amount, description, date, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.json({ message: 'Expense updated successfully' });
      }
    }
  );
};

exports.deleteExpense = (req, res) => {
  const expenseId = req.params.id;

  userModel.query(
    'DELETE FROM expenses WHERE id=?',
    [expenseId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.json({ message: 'Expense deleted successfully' });
      }
    }
  );
};
