import React, { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';

const SignUp = () => {
  const [showAlert, setShowAlert] = useState(false);
  const emailRef = useRef('');
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    const formData = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      premiumUser: 0,
    };
  
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        await response.json(); // Consume the response data (optional)
        setShowAlert(true);
        console.log("User created successfully");
      } else {
        const errorText = await response.text();
        console.error(`Failed to register user. Server response: ${errorText}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  
  

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Add logic for Sign In here

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      // Add logic based on the response
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <div className="text-center">
            <img
              src="https://source.unsplash.com/450x450/?nature"
              className="img-fluid rounded-circle"
              alt="Login"
              style={{ marginTop: "2rem", width: "150px", height: "150px" }}
            />
          </div>
          <h1 className="text-center mt-4">Welcome to the Expense Tracker App</h1>
          <Tabs defaultActiveKey="signup" id="authentication-tabs" className="mt-4">
            <Tab eventKey="signup" title="Sign Up">
              <Form onSubmit={handleSignUp} className="mt-4">
              

              <Form.Group controlId="formSignUpUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    ref={usernameRef}
                    placeholder="Enter your username"
                    required
                  />
                </Form.Group>


                <Form.Group controlId="formSignUpEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

               

                <Form.Group controlId="formSignUpPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={confirmPasswordRef}
                    placeholder="Confirm your password"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Sign Up
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="signin" title="Sign In">
              <Form onSubmit={handleSignIn} className="mt-4">
                <Form.Group controlId="formSignInEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formSignInPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Sign In
                </Button>
              </Form>
            </Tab>
          </Tabs>

          {showAlert && (
            <Alert variant="success" className="mt-3">
              Authentication successful! Welcome aboard!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
