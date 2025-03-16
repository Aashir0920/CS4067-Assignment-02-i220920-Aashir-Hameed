import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Register attempt:', { name, email, password }); // Debug log
    try {
      const response = await axios.post('http://localhost:5000/register', { name, email, password });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Register error:', error.response?.data || error);
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Title>Sign Up</Title>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => { console.log('Name changed:', e.target.value); setName(e.target.value); }}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { console.log('Email changed:', e.target.value); setEmail(e.target.value); }}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { console.log('Password changed:', e.target.value); setPassword(e.target.value); }}
          required
        />
        <Button type="submit">Register</Button>
        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #fff;
  font-family: 'Poppins', sans-serif;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #ff4b5c;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: bold;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    border-color: #ff4b5c;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Button = styled.button`
  background-color: #ff4b5c;
  color: white;
  padding: 12px;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s;
  text-transform: uppercase;

  &:hover {
    background-color: #ff6b81;
    transform: scale(1.05);
  }
`;

const Message = styled.p`
  color: #ffcc00;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
`;

export default Register;
