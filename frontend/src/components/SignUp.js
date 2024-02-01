// SignUp.js

import React, { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleAuth = async (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef?.current?.value || '',
      password: passwordRef?.current?.value || '',
      email: emailRef?.current?.value || '',
      premium: false, // Assuming that premium is set to false by default for new users
    };

    const endpoint = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json(); // Consume the response data (optional)
        setShowAlert(true);
        console.log(isLogin ? 'Login successful' : 'User created successfully');
      if(isLogin) {
        navigate('/expenses');
      }
      } else {
        const errorText = await response.text();
        console.error(`Failed to ${isLogin ? 'login' : 'register user'}. Server response: ${errorText}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setShowAlert(false); // Reset alert when toggling forms
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <div className="text-center">
            <img
              src="https://source.unsplash.com/450x450/?nature"
              className="img-fluid rounded-circle"
              alt="Login"
              style={{ marginTop: '2rem', width: '150px', height: '150px' }}
            />
          </div>
          <h1 className="text-center mt-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
          <Form onSubmit={handleAuth} className="mt-4">
            {!isLogin && (
              <Form.Group controlId="formSignUpUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" ref={usernameRef} placeholder="Enter your username" required />
              </Form.Group>
            )}

            <Form.Group controlId="formSignUpEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" ref={emailRef} placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formSignUpPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Enter your password" required />
            </Form.Group>

            {!isLogin && (
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={confirmPasswordRef}
                  placeholder="Confirm your password"
                  required
                />
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="mt-3">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Form>

          <Button variant="link" onClick={toggleForm} className="mt-3">
            {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
          </Button>

          {showAlert && (
            <Alert variant="success" className="mt-3">
              {isLogin ? 'Login successful! Welcome aboard!' : 'User created successfully!'}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
