## Data Models

### User (`src/models/user.ts`)

- `_id` (ObjectId)
- `name` (string, required)
- `email` (string, unique, required)
- `password` (string, hash, required, not selected by default)
- `role` ("user" | "admin", required)
- `totalVisitCount` (number, default 0)
- `passwordResetToken` (string | null, not selected by default)
- `refreshToken` (string | null, not selected by default)
- `createdAt`, `updatedAt`

### Link (`src/models/link.ts`)

- `_id` (ObjectId)
- `title` (string, required)
- `destination` (string, required)
- `backHalf` (string, unique, required)
- `shortLink` (string, required)
- `creator` (ObjectId, required)
- `totalVisitCount` (number, default 0)
- `createdAt`, `updatedAt`
