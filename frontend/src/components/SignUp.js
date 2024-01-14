import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [showAlert, setShowAlert] = useState(false);
  const [formData,setFormData] = useState({
  email : "",
  password : "",
  confirmPassword : "",
  });

  const handleTabChange = (activeTab) => {
    setActiveTab(activeTab);
    setShowAlert(false); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
    try{
    
      const response = await fetch('http://localhost:5000',{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
      });

      if(response.ok) {
        setShowAlert(true);
      }else{
        throw new Error("Failed to register user");
      }


    }catch(err) {
    console.log(err);
    }

  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <Container style={{marginTop:"1rem"}}>
        <div style={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
        <h1 className='text-center'
         style={{
            marginTop: "1.5rem",
            border: "1px solid black",
            padding: "1.5rem",
            borderRadius: "15px",
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.9)', // Corrected alpha value
            boxSizing: 'border-box',
          }}
        >Welcome to the expense tracker app.</h1>
        </div>
      <Container>
        <Row style={{marginTop:"2rem"}}>
          <Col md={6} style={{marginTop:"3rem"}} >          
            <div className="text-center">
              <img src="https://source.unsplash.com/450x450/?nature" className="img-fluid" alt="Login"
               style={{
                marginTop: "2rem",
                borderRadius:"100%",
              }}
               />
            </div>
          </Col>

          <Col md={6} 
           style={{
            marginTop: "2rem",
            border: "1px solid black",
            padding: "1.5rem",
            borderRadius: "15px",
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.9)', // Corrected alpha value
            boxSizing: 'border-box',
          }}
           className='justify-content-center'
           >
            <Tabs id="authentication-tabs" activeKey={activeTab} onSelect={handleTabChange}
            >
              <Tab eventKey="tab1" title="Sign In">
                <h2 className="text-center mt-4">Sign In</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formSignInEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required />
                  </Form.Group>

                  <Form.Group controlId="formSignInPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                     value={formData.password}
                     onChange={handleInputChange}
                    required />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3">
                    Sign In
                  </Button>
                </Form>
              </Tab>

              <Tab eventKey="tab2" title="Sign Up">
                <h2 className="text-center mt-4">Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formSignUpEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    required />
                  </Form.Group>

                  <Form.Group controlId="formSignUpPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    required />
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" 
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    required />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3">
                    Sign Up
                  </Button>
                </Form>
              </Tab>
            </Tabs>

            {showAlert && (
              <Alert variant="success" className="mt-3">
                Authentication successful!
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SignUp;
