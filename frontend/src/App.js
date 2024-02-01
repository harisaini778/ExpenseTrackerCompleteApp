// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import ExpensesForm from './components/ExpenseForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/expenses" element={<ExpensesForm />} />
      </Routes>
    </Router>
  );
}

export default App;
