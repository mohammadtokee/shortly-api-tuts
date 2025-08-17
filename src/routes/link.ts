/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from 'express';
import { body, query, param } from 'express-validator';

/**
 * Custom modules
 */
import expressRateLimit from '@/lib/expressRateLimit';

/**
 * Controllers
 */
import createShortLink from '@/controllers/link/createShortLink';
import getMyLinks from '@/controllers/link/getMyLinks';
import updateLinkById from '@/controllers/link/updateLinkById';
import deleteLinkById from '@/controllers/link/deleteLinkById';

/**
 * Middlewares
 */
import authentication from '@/middlewares/authentication';
import authorization from '@/middlewares/authorization';
import validationError from '@/middlewares/validationError';

/**
 * Models
 */
import Link from '@/models/link';

// Initial express router
const router = Router();

// Post route for generating short link
router.post(
  '/generate',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  body('title').notEmpty().withMessage('Title is required'),
  body('destination')
    .notEmpty()
    .withMessage('Destination is required')
    .isURL()
    .withMessage('Invalid url'),
  body('backHalf')
    .optional()
    .trim()
    .custom(async (backHalf) => {
      // Check the backHalf is already in use
      const backHalfExist = await Link.exists({ backHalf }).exec();

      // Handle case when given backHalf is already in use
      if (backHalfExist) {
        throw new Error('This backHalf is already in use');
      }
    }),
  validationError,
  createShortLink,
);

// Get route to get current user all links
router.get(
  '/my-links',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 to 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive number'),
  validationError,
  getMyLinks,
);

// Patch route to update logged user link
router.patch(
  '/:linkId',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  param('linkId').isMongoId().withMessage('Invalid link id'),
  body('title').optional(),
  body('destination')
    .optional()
    .isURL()
    .withMessage('Destination must be in url format'),
  body('backHalf')
    .optional()
    .trim()
    .custom(async (backHalf) => {
      // Check the backHalf is already in use
      const backHalfExist = await Link.exists({ backHalf }).exec();

      // Handle case when given backHalf is already in use
      if (backHalfExist) {
        throw new Error('This backHalf is already in use');
      }
    }),
  validationError,
  updateLinkById,
);

// Delete route to delete link by id
router.delete(
  '/:linkId',
  expressRateLimit('basic'),
  authentication,
  authorization(['user', 'admin']),
  param('linkId').isMongoId().withMessage('Invalid link id'),
  validationError,
  deleteLinkById,
);

export default router;
