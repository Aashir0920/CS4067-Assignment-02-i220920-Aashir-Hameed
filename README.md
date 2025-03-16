# CS4067-Assgt-EventBooking-i220920-Aashir-Hameed

# Event Booking Microservices System

## 🚀 Overview
This project is a **Node.js + MongoDB** microservices-based event booking system with **RabbitMQ** for asynchronous messaging. It includes:

1. **User Service**: Manages user registration and authentication.
2. **Event Service**: Handles event creation and ticket availability.
3. **Booking Service**: Manages ticket reservations and payments.
4. **Notification Service**: Sends email/SMS notifications via RabbitMQ.

---

## 🏗 Architecture
```
           +---------------------+       
           |    User Service     |       
           |  (Node.js + MongoDB) |       
           +---------------------+       
                     |                          
       REST API      |                          
     (User Books)    ↓                          
                     |                          
           +---------------------+       
           |  Booking Service    |       
           | (Node.js + MongoDB) |       
           |  + RabbitMQ         |       
           +---------------------+       
              |             |              
   REST API   |   RabbitMQ Event           
 (Check Avail)|  (Booking Confirmation)   
              |             ↓              
              |    +--------------------+  
              |    | Notification Service |  
              |    |  (Node.js + MongoDB) |  
              |    +--------------------+  
              |             ↑             
              |    Sends Email/SMS        
              |                           
 REST API     |                           
 (Get Event)  ↓                           
       +---------------------+       
       |   Event Service     |       
       | (Node.js + MongoDB) |       
       +---------------------+       
```

---

## 🔌 API Endpoints

### 🧑 User Service (Port: 5000)
- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /users/:userId` - Get user details

### 🎟 Event Service (Port: 5001)
- `GET /events` - Fetch all events
- `POST /events` - Create an event
- `GET /events/:eventId` - Get event details
- `PATCH /events/:eventId/availability` - Update ticket availability

### 📅 Booking Service (Port: 5002)
- `POST /bookings` - Book tickets
- `GET /bookings/user/:userId` - Get user bookings
- `GET /bookings/:bookingId` - Get booking details

### 📩 Notification Service (Port: 5003)
- **Listens to RabbitMQ for booking confirmations**
- Sends email/SMS notifications

---

## ⚙ Setup Guide

### 🛠 Prerequisites
- **Node.js** (`>=14.x`)
- **MongoDB** (`>=5.x`)
- **RabbitMQ**
- **Docker** (optional for containerized setup)

### 📌 Installation
Clone the repo and install dependencies for each service:
```sh
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

Install dependencies:
```sh
cd UserService && npm install
cd ../EventService && npm install
cd ../BookingService && npm install
cd ../NotificationService && npm install
```

### 🚀 Running Services
1️⃣ **Start MongoDB**:
```sh
mongod --dbpath /data/db
```

2️⃣ **Start RabbitMQ**:
```sh
rabbitmq-server
```

3️⃣ **Run Microservices**:
```sh
cd UserService && npm start
cd ../EventService && npm start
cd ../BookingService && npm start
cd ../NotificationService && npm start
```

### 🐳 Running with Docker (Optional)
```sh
docker-compose up --build
```

---

## 📬 Message Queue (RabbitMQ)
- **Booking Service** publishes booking confirmations.
- **Notification Service** listens and sends email/SMS notifications.

You can monitor RabbitMQ UI at:
```
http://localhost:15672
```
(Default: `guest/guest`)

---

## 📌 Contributing
Feel free to fork and contribute! 🚀
