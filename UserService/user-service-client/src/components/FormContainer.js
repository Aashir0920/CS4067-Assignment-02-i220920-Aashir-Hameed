import React, { useState, useRef } from 'react';
import Register from './Register';
import Login from './Login';
import styled from 'styled-components';

const FormContainer = () => {
  const [showRegister, setShowRegister] = useState(true);
  const formRef = useRef();

  const toggleForm = () => {
    setShowRegister((prev) => !prev);
  };

  return (
    <Container>
      <Title>Welcome to User Service</Title>
      <Button onClick={toggleForm}>{showRegister ? 'Go to Login' : 'Go to Register'}</Button>

      <FormWrapper ref={formRef}>
        {showRegister ? (
          <Form>
            <Register />
          </Form>
        ) : (
          <Form>
            <Login />
          </Form>
        )}
      </FormWrapper>
    </Container>
  );
};

// Updated Styling for Dark Mode

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #fff;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff4b5c;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(255, 75, 92, 0.7);
`;

const Button = styled.button`
  background-color: #ff4b5c;
  color: white;
  padding: 12px 20px;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s ease;
  text-transform: uppercase;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(255, 75, 92, 0.4);

  &:hover {
    background-color: #ff6b81;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 75, 92, 0.6);
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: opacity 0.5s ease-in-out;
`;

const Form = styled.div`
  width: 100%;
  transition: opacity 0.5s ease-in-out;
`;

export default FormContainer;
