/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';

/**
 * Custom modules
 */
import validationError from '@/middlewares/validationError';
import expressRateLimit from '@/lib/expressRateLimit';

/**
 * Controllers
 */
import getCurrentUser from '@/controllers/user/getCurrentUser';
import deleteCurrentUser from '@/controllers/user/deleteCurrentUser';
import updateCurrentUser from '@/controllers/user/updateCurrentUser';

/**
 * Middlewares
 */
import authentication from '@/middlewares/authentication';
import authorization from '@/middlewares/authorization';

/**
 * Models
 */
import User from '@/models/user';

// Initial express router
const router = Router();

// Get route for current user
router.get(
  '/current',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  getCurrentUser,
);

// Delete route for deleting current user
router.delete(
  '/current',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  deleteCurrentUser,
);

// Patch route for updating current user
router.patch(
  '/current',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  body('name').optional(),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (email) => {
      // Check the given email associate with another account
      const isDuplicate = await User.exists({ email }).exec();

      // Handle case when given email associate with another account
      if (isDuplicate) {
        throw new Error('This email is already in use');
      }
    }),
  body('current_password')
    .optional()
    .custom(async (currentPassword, { req }) => {
      // Extract userId from request
      const userId = req.userId;

      // Find the current user by userId
      const user = await User.findById(userId).select('password').lean().exec();

      // Handle case when user not found
      if (!user) return;

      // Compare the password
      const passwordIsValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      // Handle case when password doesn't match
      if (!passwordIsValid) {
        throw new Error('Current password is wrong');
      }
    }),
  body('new_password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .optional()
    .custom(() => {
      // Throw error if anyone try to change their role
      throw new Error('You do not have permission to change the role');
    }),
  validationError,
  updateCurrentUser,
);

export default router;
