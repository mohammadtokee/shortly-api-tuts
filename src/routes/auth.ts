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
import expressRateLimit from '@/lib/expressRateLimit';

/**
 * Controllers
 */
import register from '@/controllers/auth/register';
import login from '@/controllers/auth/login';
import logout from '@/controllers/auth/logout';
import refreshToken from '@/controllers/auth/refreshToken';
import forgotPassword from '@/controllers/auth/forgotPassword';
import resetPassword from '@/controllers/auth/resetPassword';

/**
 * Middlewares
 */
import validationError from '@/middlewares/validationError';
import authentication from '@/middlewares/authentication';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Initial express router
 */
const router = Router();

/**
 * Post route to register user
 */
router.post(
  '/register',
  expressRateLimit('basic'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value) => {
      // Check this email already in use
      const userExists = await User.exists({ email: value }).exec();

      // Handle case when duplicate email found
      if (userExists) {
        throw new Error('This email is already in use');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['user', 'admin'])
    .withMessage('Role is not support'),
  validationError,
  register,
);

/**
 * Post route to login user
 */
router.post(
  '/login',
  expressRateLimit('auth'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (email) => {
      // Find the user by email
      const user = await User.exists({ email }).exec();

      // Throw error if user doesn't exist
      if (!user) {
        throw new Error('No user found with this email');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom(async (password, { req }) => {
      // Retrieve email from request body
      const { email } = req.body;

      // Find the user by email
      const user = await User.findOne({ email })
        .select('password')
        .lean()
        .exec();

      // Handle case when user is null
      if (!user) return;

      // Check user password is correct
      const passwordIsValid = await bcrypt.compare(password, user.password);

      // Throw error if password doesn't match
      if (!passwordIsValid) {
        throw new Error('Invalid password');
      }
    }),
  validationError,
  login,
);

/**
 * Delete route to logout user
 */
router.delete('/logout', expressRateLimit('basic'), authentication, logout);

/**
 * Get route to refresh token
 */
router.get('/refresh-token', expressRateLimit('basic'), refreshToken);

/**
 * Post route to send reset password link
 */
router.post(
  '/forgot-password',
  expressRateLimit('basic'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (email) => {
      // Check provided email exist in database
      const userExists = await User.exists({ email }).exec();

      // Handle case when email doesn't exist
      if (!userExists) {
        throw new Error('No user found with this email');
      }
    }),
  validationError,
  forgotPassword,
);

/**
 * Post route to reset password
 */
router.post(
  '/reset-password',
  expressRateLimit('passReset'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validationError,
  resetPassword,
);

export default router;
