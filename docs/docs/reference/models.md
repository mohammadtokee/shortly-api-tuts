---
icon: database
---

# Data Models

## Overview

The Shortly API uses MongoDB with Mongoose ODM for data persistence. All models include automatic timestamps and proper validation.

## 🗄️ Database Schema

### User Model

```typescript
interface IUser {
  name: string;                    // User's full name
  email: string;                   // Unique email address
  password: string;                // Hashed password
  role: 'user' | 'admin';         // User role
  totalVisitCount: number;         // Total visits across all links
  passwordResetToken: string | null; // Password reset token
  refreshToken: string | null;     // JWT refresh token
  createdAt: Date;                 // Account creation timestamp
  updatedAt: Date;                 // Last update timestamp
}
```

### Link Model

```typescript
interface ILink {
  title: string;                   // Link title
  destination: string;             // Target URL
  backHalf: string;                // Short link identifier
  shortLink: string;               // Complete short URL
  creator: Types.ObjectId;         // Creator's user ID
  totalVisitCount: number;         // Total visit count
  createdAt: Date;                 // Link creation timestamp
  updatedAt: Date;                 // Last update timestamp
}
```

## 📊 Model Relationships

### One-to-Many: User → Links

```
User (1) ────── (Many) Links
  │                    │
  ├─ _id              ├─ creator (references User._id)
  ├─ name             ├─ title
  ├─ email            ├─ destination
  └─ role             └─ backHalf
```

### Data Flow

1. **User creates link** → Link.creator = User._id
2. **Link visits tracked** → Link.totalVisitCount increments
3. **User analytics** → User.totalVisitCount aggregates all user's links

## 🔍 Field Details

### User Model Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | ✅ | Unique user identifier |
| `name` | String | ✅ | Full name (2-50 chars) |
| `email` | String | ✅ | Unique email address |
| `password` | String | ✅ | Hashed password (min 8 chars) |
| `role` | Enum | ✅ | 'user' or 'admin' |
| `totalVisitCount` | Number | ❌ | Total visits (default: 0) |
| `passwordResetToken` | String | ❌ | Reset token (select: false) |
| `refreshToken` | String | ❌ | JWT refresh token (select: false) |
| `createdAt` | Date | ❌ | Creation timestamp |
| `updatedAt` | Date | ❌ | Last update timestamp |

### Link Model Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | ❌ | Unique link identifier |
| `title` | String | ✅ | Link title (1-100 chars) |
| `destination` | String | ✅ | Target URL (valid URI) |
| `backHalf` | String | ✅ | Short identifier (unique) |
| `shortLink` | String | ✅ | Complete short URL |
| `creator` | ObjectId | ✅ | Creator's user ID |
| `totalVisitCount` | Number | ❌ | Visit count (default: 0) |
| `createdAt` | Date | ❌ | Creation timestamp |
| `updatedAt` | Date | ❌ | Last update timestamp |

## 🛡️ Data Validation

### User Validation Rules

```typescript
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false  // Exclude from queries by default
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['user', 'admin'],
      message: '`{VALUE}` is not supported'
    }
  },
  totalVisitCount: {
    type: Number,
    default: 0
  },
  passwordResetToken: {
    type: String,
    default: null,
    select: false
  },
  refreshToken: {
    type: String,
    default: null,
    select: false
  }
}, {
  timestamps: true  // Automatic createdAt and updatedAt
});
```

### Link Validation Rules

```typescript
const linkSchema = new Schema<ILink>({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  destination: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Destination must be a valid URL'
    }
  },
  backHalf: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v: string) {
        return /^[a-zA-Z0-9_-]+$/.test(v);
      },
      message: 'Back-half can only contain letters, numbers, underscores, and hyphens'
    }
  },
  shortLink: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  totalVisitCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
```

## 📈 Performance Optimizations

### Query Optimization

- **Lean queries** for read-only operations
- **Selective field inclusion** to reduce data transfer
- **Pagination** to limit result sets
