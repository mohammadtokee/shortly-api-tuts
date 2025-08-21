---
icon: gear
---

# Environment Setup

## Overview

This guide covers the complete environment configuration for the Shortly API, including all required environment variables, their purposes, and recommended values for different environments.

## 🔧 Environment Configuration

### Environment File Structure

The application uses a `.env` file for environment configuration. Create this file in the root directory of your project.

```bash
# Create environment file
touch .env

# Or copy from example (if available)
cp .env.example .env
```

## 📋 Required Environment Variables

### Server Configuration

| Variable   | Description        | Default       | Required |
| ---------- | ------------------ | ------------- | -------- |
| `PORT`     | Server port number | `3000`        | ✅        |
| `NODE_ENV` | Environment mode   | `development` | ✅        |

```bash
# Server Configuration
PORT=3000
NODE_ENV=development
```

### Database Configuration

| Variable      | Description               | Default | Required |
| ------------- | ------------------------- | ------- | -------- |
| `MONGODB_URI` | MongoDB connection string | -       | ✅        |

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/shortly
```

**Connection String Formats:**

```bash
# Local Development
MONGODB_URI=mongodb://localhost:27017/shortly

# With Authentication
MONGODB_URI=mongodb://username:password@localhost:27017/shortly

# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shortly

# With Options
MONGODB_URI=mongodb://localhost:27017/shortly?retryWrites=true&w=majority
```

### JWT Configuration

| Variable                 | Description               | Default | Required |
| ------------------------ | ------------------------- | ------- | -------- |
| `JWT_ACCESS_SECRET`      | Secret for access tokens  | -       | ✅        |
| `JWT_REFRESH_SECRET`     | Secret for refresh tokens | -       | ✅        |
| `JWT_ACCESS_EXPIRES_IN`  | Access token lifetime     | `1h`    | ❌        |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token lifetime    | `7d`    | ❌        |

```bash
# JWT Configuration
JWT_ACCESS_SECRET=your_super_secret_access_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

**Security Recommendations:**

* Use **strong, random secrets** (at least 32 characters)
* **Never commit** secrets to version control
* Use **different secrets** for access and refresh tokens
* **Rotate secrets** regularly in production

### Email Configuration

| Variable    | Description                | Default | Required |
| ----------- | -------------------------- | ------- | -------- |
| `SMTP_HOST` | SMTP server hostname       | -       | ✅        |
| `SMTP_PORT` | SMTP server port           | `587`   | ❌        |
| `SMTP_USER` | SMTP username/email        | -       | ✅        |
| `SMTP_PASS` | SMTP password/app password | -       | ✅        |

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**Popular SMTP Providers:**

```bash
# Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Outlook/Hotmail
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587

# Yahoo
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587

# Custom SMTP
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
```

### Client Configuration

| Variable        | Description              | Default | Required |
| --------------- | ------------------------ | ------- | -------- |
| `CLIENT_ORIGIN` | Frontend application URL | -       | ✅        |

```bash
# Client Configuration
CLIENT_ORIGIN=http://localhost:3000
```

**Usage Examples:**

```bash
# Development
CLIENT_ORIGIN=http://localhost:3000

# Production
CLIENT_ORIGIN=https://shortly.codewithsadee.com

# Multiple origins (comma-separated)
CLIENT_ORIGIN=http://localhost:3000,https://shortly.codewithsadee.com
```

### Cookie Configuration

| Variable         | Description                 | Default     | Required |
| ---------------- | --------------------------- | ----------- | -------- |
| `COOKIE_MAX_AGE` | Cookie expiration time (ms) | `604800000` | ❌        |

```bash
# Cookie Configuration
COOKIE_MAX_AGE=604800000
```

**Time Values:**

```bash
# 1 hour
COOKIE_MAX_AGE=3600000

# 1 day
COOKIE_MAX_AGE=86400000

# 7 days (default)
COOKIE_MAX_AGE=604800000

# 30 days
COOKIE_MAX_AGE=2592000000
```

## 🌍 Environment-Specific Configurations

### Development Environment

```bash
# .env.development
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shortly_dev
CLIENT_ORIGIN=http://localhost:3000
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

### Testing Environment

```bash
# .env.test
NODE_ENV=test
PORT=3001
MONGODB_URI=mongodb://localhost:27017/shortly_test
CLIENT_ORIGIN=http://localhost:3000
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=1h
```

### Production Environment

```bash
# .env.production
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shortly
CLIENT_ORIGIN=https://shortly.codewithsadee.com
JWT_ACCESS_EXPIRES_IN=30m
JWT_REFRESH_EXPIRES_IN=7d
```

## 🔐 Security Best Practices

### Secret Management

```bash
# Generate strong secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Use environment-specific secrets
JWT_ACCESS_SECRET=dev_access_secret_123
JWT_REFRESH_SECRET=dev_refresh_secret_456
```

### Production Security

```bash
# Use HTTPS in production
NODE_ENV=production

# Restrict client origins
CLIENT_ORIGIN=https://yourdomain.com

# Shorter token lifetimes
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=1d
```

## 📁 File Organization

### Recommended Structure

```
project-root/
├── .env                    # Local development
├── .env.example           # Template file
├── .env.development       # Development environment
├── .env.test             # Testing environment
├── .env.production       # Production environment
└── .gitignore            # Exclude .env files
```

### Git Ignore Configuration

```gitignore
# Environment files
.env
.env.local
.env.*.local

# But include examples
!.env.example
```

## 🚀 Environment Loading

### Loading Priority

The application loads environment variables in this order:

1. **System environment variables** (highest priority)
2. **`.env` file** in project root
3. **`.env.{NODE_ENV}`** file
4. **Default values** (lowest priority)

### Environment File Loading

```typescript
// Load environment variables
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Load environment-specific file
if (process.env.NODE_ENV) {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}
```

## ✅ Validation

### Environment Variable Validation

```typescript
// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
  'CLIENT_ORIGIN'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
```

### Configuration Validation

```typescript
// Validate configuration values
const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI!,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  smtpHost: process.env.SMTP_HOST!,
  smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
  smtpUser: process.env.SMTP_USER!,
  smtpPass: process.env.SMTP_PASS!,
  clientOrigin: process.env.CLIENT_ORIGIN!,
  cookieMaxAge: parseInt(process.env.COOKIE_MAX_AGE || '604800000', 10)
};

// Validate port range
if (config.port < 1 || config.port > 65535) {
  throw new Error('Invalid port number');
}
```

## 🛠️ Troubleshooting

### Common Issues

<details>

<summary>1. Environment Variables Not Loading</summary>

```bash
# Check if .env file exists
ls -la .env

# Verify file permissions
chmod 600 .env

# Check for syntax errors
cat .env
```

</details>

<details>

<summary>2. Database Connection Failed</summary>

```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/shortly"

# Check MongoDB status
sudo systemctl status mongod
```

</details>

<details>

<summary>3. JWT Errors</summary>

```bash
# Verify JWT secrets are set
echo $JWT_ACCESS_SECRET
echo $JWT_REFRESH_SECRET

# Check secret length
echo $JWT_ACCESS_SECRET | wc -c
```

</details>

{% hint style="warning" %}
## 📝 Notes

* **Never commit** `.env` files to version control
* **Use strong secrets** for JWT tokens
* **Validate all inputs** before using
* **Test configuration** in each environment
* **Monitor logs** for configuration errors
{% endhint %}

## 📚 Related Documentation

* [Installation Guide](installation.md) - Setup and installation
* [API Reference](../api/) - API documentation
* [Security Features](../reference/security.md) - Security configuration
* [Data Models](../reference/models.md) - Database setup

***

**Next step:** After configuring your environment, proceed to [Installation Guide](installation.md) to start the application.
