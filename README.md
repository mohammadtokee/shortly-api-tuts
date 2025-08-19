# Shortly API 🚀

A robust and scalable URL shortening REST API built with **Express.js**, **TypeScript**, and **MongoDB**. This project provides a complete backend solution for creating, managing, and tracking short URLs with enterprise-grade security and performance features.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1+-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.17+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## ✨ Features

- 🔐 **JWT Authentication** with access/refresh tokens (refresh tokens stored in httpOnly cookies)
- 👥 **Role-based Authorization** (`user`, `admin`) with granular permissions
- 🚦 **Rate Limiting** per route type to prevent abuse
- 📧 **Password Reset** via email tokens with secure mail templates
- 🔗 **Link Management** - create, read, update, delete with pagination
- 📊 **Analytics** - track visit counts and user engagement
- 🛡️ **Security** - Helmet.js, CORS, input validation, and sanitization
- 📝 **Logging** - Winston logger with Logtail integration
- 🚀 **Performance** - Response compression and optimized database queries
- 📱 **API Documentation** - Comprehensive GitBook-style documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 8.17+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shortly-api-tuts.git
   cd shortly-api-tuts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the application**
   ```bash
   # Development
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

## 🌐 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Links
- `POST /links` - Create short link
- `GET /links` - Get user's links (paginated)
- `PUT /links/:id` - Update link
- `DELETE /links/:id` - Delete link

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update current user profile
- `DELETE /users/me` - Delete current user account

### Redirect
- `GET /:backHalf` - Redirect to destination URL

## 🏗️ Project Structure

```
src/
├── @types/          # TypeScript type definitions
├── config/          # Configuration files
├── controllers/     # Route controllers
│   ├── auth/       # Authentication controllers
│   ├── link/       # Link management controllers
│   ├── redirect/   # Redirect controller
│   └── user/       # User profile controllers
├── lib/            # Core libraries and utilities
├── mailTemplates/  # Email templates
├── middlewares/    # Express middlewares
├── models/         # MongoDB models
├── routes/         # API routes
├── types/          # TypeScript interfaces
├── utils/          # Utility functions
└── server.ts       # Main server file
```

## 🔧 Configuration

The application uses environment variables for configuration. Key variables include:

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `SMTP_HOST` - SMTP server for emails
- `CLIENT_ORIGIN` - Allowed CORS origin

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- [Getting Started Guide](docs/getting-started/installation.md)
- [Environment Setup](docs/getting-started/environment.md)
- [API Reference](docs/api/root.md)
- [Authentication Guide](docs/reference/authentication.md)
- [Rate Limits](docs/reference/rate-limits.md)
- [Security Best Practices](docs/reference/security.md)

## 🛠️ Development

### Scripts

```bash
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Code Quality

- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **ESLint Config Prettier** - Prettier integration

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent API abuse
- **Input Validation** - Request data sanitization
- **JWT Security** - Secure token handling
- **Password Hashing** - bcrypt encryption
- **HTTP-Only Cookies** - XSS protection

## 📊 Database Models

### User Model
- Name, email, password
- Role-based access control
- Password reset functionality
- Visit count tracking

### Link Model
- Title and destination URL
- Custom back-half support
- Creator association
- Visit count analytics
- Timestamps

## 🚀 Deployment

The application is production-ready with:

- Graceful shutdown handling
- Environment-based configuration
- Comprehensive error logging
- Performance optimizations
- Security best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**codewithsadee**

- GitHub: [@codewithsadee](https://github.com/codewithsadee)

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the robust database
- TypeScript team for the type safety
- All contributors and supporters

---

⭐ **Star this repository if you find it helpful!**
