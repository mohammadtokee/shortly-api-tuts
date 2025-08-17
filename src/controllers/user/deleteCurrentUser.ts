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
import User from '@/models/user';
import Link from '@/models/link';

/**
 * Types
 */
import type { Request, Response } from 'express';

const deleteCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Get the user id from request
  const userId = req.userId;

  try {
    // Delete all links associated with current user
    await Link.deleteMany({ creator: userId });

    // Delete the currently logged user by userId
    await User.deleteOne({ _id: userId });

    // Send response to the client with message
    res.sendStatus(204);
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during deleting current user', error);
  }
};

export default deleteCurrentUser;
