/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Link from '@/models/link';
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';

const redirect = async (req: Request, res: Response): Promise<void> => {
  // Get the backHalf from request param
  const { backHalf } = req.params;

  try {
    // Check this backHalf associate with any link or not
    const backHalfExist = await Link.exists({ backHalf }).exec();

    // If not response 404 status
    if (!backHalfExist) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Link not found',
      });
      return;
    }

    // Retrieve the destination URL and creator of the link by its ID
    const link = await Link.findById(backHalfExist._id)
      .select('destination creator totalVisitCount')
      .exec();

    // Return if link doesn't found
    if (!link) return;

    // Update totalVisitCount by 1 to show stats
    link.totalVisitCount++;
    await link.save();

    // Create a new visit count for the link visit
    const user = await User.findById(link.creator)
      .select('totalVisitCount')
      .exec();

    // Return if user doesn't found
    if (!user) return;

    // Update totalVisitCount by 1 to show user stats
    user.totalVisitCount++;
    await user.save();

    // Redirect to destination
    res.redirect(
      link.destination.startsWith('https://')
        ? link.destination
        : `https://${link.destination}`,
    );
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during redirecting link', error);
  }
};

export default redirect;
