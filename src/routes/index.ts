/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Routes
 */
import authRoutes from '@/routes/auth';
import userRoutes from '@/routes/user';
import linkRoutes from '@/routes/link';
import redirectRoutes from '@/routes/redirect';

/**
 * Initial express router
 */
const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    docs: 'https://docs.shortly.codewithsadee.com',
    timestamp: new Date().toISOString(),
  });
});

// Auth routes
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Link routes
router.use('/links', linkRoutes);

// Redirect routes
router.use('/', redirectRoutes);

export default router;
