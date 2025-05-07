# 📦 Event Booking Platform – Dockerized Microservices

This repository contains a Dockerized microservices-based event booking application. The platform includes backend services for users, events, bookings, and notifications, as well as a React-based frontend client.

MongoDB runs locally on your machine (not in a Docker container), while all other services are containerized and orchestrated via Docker Compose.

---

## 💠 Prerequisites

Make sure the following are installed and running on your system:

- Docker & Docker Compose
- Node.js & npm
- MongoDB (installed and running locally on port 27017)

---

## 📁 Project Structure

```
CS4067-Assignment-02-i220920-Aashir-Hameed/
│
├── UserService/
│   ├── index.js
│   ├── models/
│   ├── Dockerfile
│   └── .env
│
├── EventService/
│   ├── index.js
│   ├── Dockerfile
│   └── .env
│
├── BookingService/
│   ├── index.js
│   ├── models/
│   ├── Dockerfile
│   └── .env
│
├── NotificationService/
│   ├── index.js
│   ├── Dockerfile
│   └── .env
│
├── UserService/user-service-client/
│   ├── Dockerfile
│   └── .env
│
└── docker-compose.yaml
```

---

## 🧱 Dockerfile Format

All Node.js services use a similar Dockerfile structure:

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE <PORT>
CMD ["node", "index.js"]
```

For the frontend React client:

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## ⚙️ Environment Variables (.env)

Each service has its own .env file. Example:

📁 BookingService/.env

```env
MONGODB_URI=mongodb://host.docker.internal:27017/booking-service
PORT=5003
RABBITMQ_URL=amqp://host.docker.internal
```

📁 NotificationService/.env

```env
MONGODB_URI=mongodb://host.docker.internal:27017/notification-service
PORT=5004
RABBITMQ_URL=amqp://host.docker.internal
```

Note: Use host.docker.internal to access MongoDB running on your local machine from inside Docker containers.

---

## 🛣️ Docker Compose

The docker-compose.yaml file orchestrates:

- RabbitMQ container
- All microservices
- The frontend React app

To start all services:

```bash
docker compose up -d --build
```

To stop all services:

```bash
docker compose down
```

---

## 🔌 Accessing Services

- Frontend Client → http://localhost:3000
- User Service → http://localhost:5001
- Event Service → http://localhost:5002
- Booking Service → http://localhost:5003
- Notification Service → http://localhost:5004
- RabbitMQ Dashboard → http://localhost:15673 (user: guest / pass: guest)

---

## 👰 RabbitMQ Configuration

The RabbitMQ service is exposed using these ports:

- 5673 (AMQP protocol)
- 15673 (Management UI)

Environment config in docker-compose.yaml:

```yaml
rabbitmq:
  image: rabbitmq:3-management
  ports:
    - "5673:5672"
    - "15673:15672"
  environment:
    - RABBITMQ_DEFAULT_USER=guest
    - RABBITMQ_DEFAULT_PASS=guest
```

---

## 🧪 Testing MongoDB

Ensure MongoDB is running locally. To check:

```bash
mongosh
> show dbs
> use booking-service
> db.bookings.find()
```

You can also use MongoDB Compass for GUI access:
mongodb://localhost:27017

---

## 🚯 Troubleshooting

- ECONNREFUSED: MongoDB or RabbitMQ might not be running.
- Make sure MongoDB is started outside Docker.
- Check docker logs:

```bash
docker logs <container_name>
```

- Ensure all .env files are correctly named and placed.

---

## 📦 Final Notes

- MongoDB is kept outside Docker to preserve local development convenience.
- RabbitMQ is containerized and accessible via management UI.
- React frontend is served via Docker and connects to user-service via REACT_APP_API_URL.

---
