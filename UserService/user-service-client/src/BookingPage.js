import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BookingPage = () => {
  const [tickets, setTickets] = useState(1);
  const [message, setMessage] = useState('');
  const [cardInfo, setCardInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const navigate = useNavigate();
  const { eventId } = useParams();
  const userId = localStorage.getItem('userId') || 'user123';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  useEffect(() => {
    const fetchEventTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/events/${eventId}`);
        localStorage.setItem(`eventTitle_${eventId}`, response.data.title || 'Unknown Event');
      } catch (error) {
        console.error('Error fetching event title:', error);
        localStorage.setItem(`eventTitle_${eventId}`, 'Unknown Event');
      }
    };
    fetchEventTitle();
  }, [eventId]);

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/bookings', { userId, eventId, tickets, cardInfo, userEmail });
      setMessage(response.data.message);
      if (response.data.details) {
        const eventTitle = localStorage.getItem(`eventTitle_${eventId}`) || 'Unknown';
        setMessage(`Booking successful! Details: Event ${eventTitle}, Tickets: ${response.data.details.tickets}, Status: ${response.data.details.status}`);
      }
      setTimeout(() => navigate('/events'), 3000);
    } catch (error) {
      console.error('Error creating booking:', error.response?.data || error.message);
      setMessage(`Error creating booking: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Container>
      <Title>Book Your Event</Title>
      <EventInfo>Booking for Event ID: {eventId}</EventInfo>
      <Form onSubmit={handleBook}>
        <Label>
          Tickets:
          <Input
            type="number"
            min="1"
            value={tickets}
            onChange={(e) => setTickets(Math.max(1, e.target.value))}
            required
          />
        </Label>
        <Label>
          Card Number:
          <Input
            type="text"
            value={cardInfo.cardNumber}
            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
            placeholder="Enter card number"
            required
          />
        </Label>
        <Label>
          Expiry Date:
          <Input
            type="text"
            value={cardInfo.expiry}
            onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
            placeholder="MM/YY"
            required
          />
        </Label>
        <Label>
          CVV:
          <Input
            type="text"
            value={cardInfo.cvv}
            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
            placeholder="CVV"
            required
          />
        </Label>
        <Button type="submit">Confirm Booking</Button>
      </Form>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

// Styled Components for Dark Mode
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff4b5c;
  margin-bottom: 10px;
  text-shadow: 2px 2px 8px rgba(255, 75, 92, 0.7);
`;

const EventInfo = styled.p`
  font-size: 1.2rem;
  color: #ffcc00;
  margin-bottom: 20px;
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

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #fff;
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
  box-shadow: 0 4px 15px rgba(255, 75, 92, 0.4);

  &:hover {
    background-color: #ff6b81;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 75, 92, 0.6);
  }
`;

const Message = styled.p`
  color: #ffcc00;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
`;

export default BookingPage;
