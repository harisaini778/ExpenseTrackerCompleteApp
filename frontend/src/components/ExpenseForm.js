// ExpensesForm.js

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Navbar } from "react-bootstrap";

export default function ExpensesForm() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [userName, setUserName] = useState("John Doe"); 

  const handleAddExpense = (e) => {
    e.preventDefault();
  
  };

  const expenseCategories = [
    { value: "Travel", label: "Travel", image: "https://source.unsplash.com/450x200/?travel" },
    { value: "Snacks", label: "Snacks/Junk food", image: "https://source.unsplash.com/450x200/?snacks" },
    { value: "Vegetable", label: "Vegetable", image: "https://source.unsplash.com/450x200/?vegetable" },
    { value: "Education", label: "Education", image: "https://source.unsplash.com/450x200/?education" },
    { value: "Electronics", label: "Electronics", image: "https://source.unsplash.com/450x200/?electronics" },
  ];

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
        <Navbar.Brand href="#"><h2>Expense Tracker</h2></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {userName}
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>


      <Container>
      <Row>
        <Col lg={12} className="bg-light p-4 border m-2 rounded shadow">
          <h2 className="text-center mb-4">Add Expense</h2>
          <Form onSubmit={handleAddExpense}>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category...</option>
                {expenseCategories.map((categoryOption) => (
                  <option key={categoryOption.value} value={categoryOption.value}>
                    {categoryOption.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="amount" className="d-flex">
              <Form.Label className="bg-secondary text-white p-2 rounded-left">
                ₹
              </Form.Label>
              <Form.Control
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-3"
            >
              Add Expense
            </Button>
          </Form>
        </Col>
        <Col lg={4} className="p-4">
          <h2 className="text-2xl font-semibold mb-4">User Expenses</h2>
          {userName && (
            <p className="mb-4">Hello, {userName}! Here are your expenses:</p>
          )}
          {category && (
            <Card>
              <Card.Img
                variant="top"
                src={expenseCategories.find(cat => cat.value === category)?.image}
                alt={category}
              />
              <Card.Body>
                <Card.Title>{category}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>
                  <span className="font-semibold">Amount:</span> ₹{amount}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      </Container>
    </div>
  );
}
