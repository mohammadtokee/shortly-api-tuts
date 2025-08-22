/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import config from '@/config';
import { logger } from '@/lib/winston';

/**
 * Types
 */
import type { CorsOptions } from 'cors';

// CORS configuration options
const corsOptions: CorsOptions = {
  // Custom origin validation function
  origin(requestOrigin, callback) {
    // Allow the request if origin exists and is in the whitelist
    if (requestOrigin && config.CORS_WHITELIST.includes(requestOrigin)) {
      callback(null, true);
    } else {
      // In development allow all origins; other, block with an error
      callback(
        config.NODE_ENV === 'development'
          ? null
          : new Error(`CORS error: ${requestOrigin} is not allowed by CORS`),
        false,
      );
      logger.warn(`CORS error: ${requestOrigin} is not allowed by CORS`);
    }
  },
};

export default corsOptions;
