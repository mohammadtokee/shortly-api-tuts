/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { rateLimit } from 'express-rate-limit';

/**
 * Custom modules
 */
import config from '@/config';

/**
 * Types
 */
import type { RateLimitRequestHandler, Options } from 'express-rate-limit';
type RateLimitType = 'basic' | 'auth' | 'passReset';

// Default rate limit configuration applied for all types
const defaultLimitOpt: Partial<Options> = {
  windowMs: config.WINDOW_MS, // Time window for rate limit (1h in millisecond)
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  standardHeaders: true, // Enable standard headers (`RateLimit-*`)
};

// Map holding specific rate limit options based on type
const rateLimitOpt = new Map<RateLimitType, Partial<Options>>([
  ['basic', { ...defaultLimitOpt, limit: 100 }], // 100 requests per window for basic type
  ['auth', { ...defaultLimitOpt, limit: 10 }], // 10 request per window for auth type
  ['passReset', { ...defaultLimitOpt, limit: 3 }], // 3 request per window for password reset
]);

// Function to get rate limit middleware based on type
const expressRateLimit = (type: RateLimitType): RateLimitRequestHandler => {
  return rateLimit(rateLimitOpt.get(type)); // Retrieve config from map and return middleware
};

export default expressRateLimit;
