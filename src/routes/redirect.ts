/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import redirect from '@/controllers/redirect/redirect';

/**
 * Middlewares
 */
import expressRateLimit from '@/lib/expressRateLimit';

// Initial express router
const router = Router();

// Get route to redirect url
router.get('/:backHalf', expressRateLimit('basic'), redirect);

export default router;
