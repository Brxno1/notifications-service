# Notifications Service

A robust microservice for notification management built with NestJS and Prisma, following Clean Architecture principles.

## 🚀 Technologies

- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Language**: TypeScript
- **Testing**: Jest
- **Package Manager**: pnpm

## 📋 Features

- ✅ Send notifications
- ✅ Paginated notification listing by recipient
- ✅ Count notifications by recipient
- ✅ Cancel notifications
- ✅ Mark notifications as read/unread
- ✅ JWT authentication
- ✅ Data validation with class-validator

## 🏗️ Architecture

The project follows Clean Architecture principles:

```
src/
├── app/                    # Application layer
│   ├── entities/          # Domain entities
│   ├── repositories/      # Repository contracts
│   └── use-cases/         # Use cases
├── infra/                 # Infrastructure layer
│   ├── auth/             # Authentication setup
│   ├── database/         # Concrete repositories
│   └── http/             # Controllers and DTOs
└── helpers/              # General utilities
```

## 🛠️ Installation

### Prerequisites

- Node.js (version 18 or higher)
- PostgreSQL
- pnpm

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd notifications-service
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

```bash
# Create a .env file in the project root
DATABASE_URL="postgresql://username:password@localhost:5432/notifications_db"
JWT_SECRET="your-jwt-secret"
PORT=3333
```

4. Run database migrations:

```bash
pnpm prisma migrate dev
```

5. Generate Prisma client:

```bash
pnpm prisma generate
```

## 🚀 Running

### Development

```bash
pnpm start:dev
```

### Production

```bash
pnpm build
pnpm start:prod
```

## 🐳 Docker

### Development

```bash
# Start complete environment (app only)
pnpm docker:up

# Stop environment temporarily (containers remain)
pnpm docker:stop

# Resume stopped environment
pnpm docker:start

# Stop and remove containers completely
pnpm docker:down

# View logs in real-time
pnpm docker:logs
```

### Manual Build

```bash
# Build image
pnpm docker:build

# Run standalone container
pnpm docker:run
```

### Direct Docker Commands

```bash
# Build image
docker build -t app .

# Run in development mode
docker-compose up --build

# Run in background
docker-compose up -d

# Stop containers temporarily
docker-compose stop

# Start containers
docker-compose start

# Stop and remove containers
docker-compose down

# View specific logs
docker-compose logs -f app
```

### Production

```bash
# Build for production (optimized and secure image)
docker build --target production -t app:prod .

# Run production
docker run -p 3333:3333 app:prod
```

The app will be available at `http://localhost:3333` when running via Docker.

## 🧪 Testing

```bash
# Unit tests
pnpm test

# Tests in watch mode
pnpm test:watch

# Tests with coverage
pnpm test:cov

# E2E tests
pnpm test:e2e
```

## 📚 API Documentation

### Authentication

All routes require JWT authentication. Include the token in the header:

```
Authorization: Bearer <your-token>
```

### Endpoints

#### `POST /notifications`

Creates a new notification.

**Body:**

```json
{
  "recipientId": "recipient-uuid",
  "content": "Notification content (5-240 characters)",
  "category": "notification-category"
}
```

**Response:**

```json
{
  "notification": {
    "id": "notification-uuid",
    "content": "Notification content",
    "category": "category",
    "recipientId": "recipient-uuid",
    "createdAt": "2023-12-01T10:00:00Z",
    "readAt": null,
    "canceledAt": null
  }
}
```

#### `GET /notifications/:recipientId/list?page=1&limit=15`

Lists notifications for a recipient with pagination.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 15, max: 100)

#### `GET /notifications/:recipientId/count`

Counts total notifications for a recipient.

**Response:**

```json
{
  "count": 42
}
```

#### `PATCH /notifications/:id/cancel`

Cancels a specific notification.

#### `PATCH /notifications/:id/read`

Marks a notification as read.

#### `PATCH /notifications/:id/unread`

Marks a notification as unread.

## 🗄️ Data Model

```prisma
model Notification {
  id          String    @id @default(uuid())
  content     String
  category    String
  recipientId String
  createdAt   DateTime  @default(now())
  readAt      DateTime?
  canceledAt  DateTime?

  @@index([recipientId])
  @@map("notifications")
}
```

## 🔧 Useful Scripts

```bash
# Format code
pnpm format

# Lint
pnpm lint

# Reset database
pnpm prisma migrate reset

# View database
pnpm prisma studio
```

## 📈 Monitoring

The service runs by default on port `3333`. To check if it's working:

```bash
curl http://localhost:3333/health
```
