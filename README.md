# Event Booking Platform – Dockerized Microservices

## 🚀 Overview
A Dockerized microservices-based Event Booking Platform with User, Event, Booking, and Notification services, plus a React frontend.

## 🛠️ Components
| Service              | Port  |
|----------------------|-------|
| User Service         | 5001  |
| Event Service        | 5002  |
| Booking Service      | 5003  |
| Notification Service | 5004  |
| Frontend (React)     | 3000  |
| RabbitMQ Management  | 15673 |

## 📋 Prerequisites
- Docker Desktop (running)
- Node.js (for local dev/testing)
- MongoDB running locally (`mongod` on port 27017)

## 🏗️ Project Structure
CS4067-Assignment-02-i220920-Aashir-Hameed/
│
├── UserService/
│ ├── Dockerfile
│ ├── index.js
│ ├── models/
│ └── .env
│
├── EventService/
│ ├── Dockerfile
│ ├── index.js
│ └── .env
│
├── BookingService/
│ ├── Dockerfile
│ ├── index.js
│ └── .env
│
├── NotificationService/
│ ├── Dockerfile
│ ├── index.js
│ └── .env
│
├── UserService/user-service-client/
│ ├── Dockerfile
│ └── .env
│
└── docker-compose.yaml


## 🐳 Docker Setup

### Sample Dockerfile (Node.js Service)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["node", "index.js"]
Sample Dockerfile (React Frontend)
dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
⚙️ Environment Variables
Example .env (EventService)
MONGODB_URI=mongodb://host.docker.internal:27017/event-service
PORT=5002
RABBITMQ_URL=amqp://host.docker.internal
🚀 Deployment
Start MongoDB locally:

mongod
Build and run all services:

docker compose up -d --build
🔌 Access Points
Frontend: http://localhost:3000

User API: http://localhost:5001

Event API: http://localhost:5002

Booking API: http://localhost:5003

Notification API: http://localhost:5004

RabbitMQ UI: http://localhost:15673 (guest/guest)

🛑 Shutdown
docker compose down
🐞 Troubleshooting
Check container logs: docker logs <container_name>

Verify MongoDB is running: mongodb://localhost:27017/

Ensure host.docker.internal resolves correctly

Check all services are running: docker ps
