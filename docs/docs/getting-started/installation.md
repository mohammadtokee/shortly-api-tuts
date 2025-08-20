---
icon: rocket
---

# Installation Guide

## Overview

This guide will walk you through setting up the Shortly API on your local development environment. Follow these steps to get the API running locally.

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (v5.0 or higher)
- **Git** for version control

### Check Your Environment

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version

# Check Git version
git --version
```

## 📥 Clone the Repository

```bash
# Clone the repository
git clone https://github.com/mohammadtokee/shortly-api-tuts.git

# Navigate to the project directory
cd shortly-api-tuts

# Install dependencies
npm install
```

## 🔧 Environment Configuration

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
# Copy the example environment file
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your configuration:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/shortly

# JWT Configuration
JWT_ACCESS_SECRET=your_super_secret_access_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Client Configuration
CLIENT_ORIGIN=http://localhost:3000

# Cookie Configuration
COOKIE_MAX_AGE=604800000
```

## 🗄️ Database Setup

### 1. Start MongoDB

```bash
# Start MongoDB service
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

### 2. Create Database

```bash
# Connect to MongoDB
mongosh

# Create and use the database
use shortly

# Verify the database was created
show dbs
```

## 📦 Install Dependencies

```bash
# Install all dependencies
npm install

# Or if using yarn
yarn install
```

## 🚀 Start the Application

### Development Mode

```bash
# Start in development mode with nodemon
npm run dev

# Or start without nodemon
npm start
```

### Production Mode

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

## ✅ Verify Installation

### 1. Check Server Status

Visit `http://localhost:3000` in your browser or use curl:

```bash
curl http://localhost:3000
```

Expected response:
```json
{
  "message": "Welcome to Shortly API",
  "version": "1.0.0",
  "status": "running",
  "timestamp": "2024-01-15T10:00:00.000Z"
}
```

### 2. Test API Health

```bash
curl http://localhost:3000/health
```

### 3. Check Database Connection

The server logs should show:
```
✅ MongoDB connected successfully
🚀 Server running on port 3000
```

## 🔧 Development Tools

### Available Scripts

```bash
# Development
npm run dev          # Start with nodemon
npm run start        # Start without nodemon

# Building
npm run build        # Build TypeScript to JavaScript
npm run start:prod   # Start production build

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Type checking
npm run type-check   # Check TypeScript types
```

### Hot Reload

The development server uses `nodemon` for automatic restarts when files change.

## 🛠️ Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### 2. MongoDB Connection Failed

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB if stopped
sudo systemctl start mongod
```

#### 3. Environment Variables Missing

Ensure all required environment variables are set in your `.env` file.

#### 4. Dependencies Installation Failed

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

Enable debug logging by setting:

```bash
DEBUG=* npm run dev
```

## 📚 Next Steps

After successful installation:

1. **Set up authentication** - Create your first user account
2. **Create short links** - Test the core functionality
3. **Explore the API** - Use the OpenAPI specification
4. **Read the documentation** - Understand all features

## 🔗 Related Documentation

- [Environment Setup](environment.md) - Environment configuration details
- [API Reference](../api/README.md) - Complete API documentation
- [OpenAPI Specification](../api-specs/openapi.yaml) - API specification
- [Data Models](../reference/models.md) - Database schema

## 📝 Notes

- **Development mode** includes hot reload and detailed logging
- **Production mode** is optimized for performance
- **Environment variables** are loaded from `.env` file
- **MongoDB** must be running before starting the server
- **Port 3000** is the default development port

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** - Server logs provide detailed error information
2. **Verify prerequisites** - Ensure all required software is installed
3. **Check environment** - Verify all environment variables are set
4. **Review documentation** - Check related documentation sections
5. **Open an issue** - Report bugs on GitHub with detailed information

---

**Ready to start?** Once installation is complete, proceed to [Environment Setup](environment.md) for detailed configuration options.
