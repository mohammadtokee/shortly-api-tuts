/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import bcrypt from 'bcrypt';

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';

const updateCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Extract the logged userId from request object
  const userId = req.userId;

  // Get the properties to update
  const requestToUpdate = req.body;

  // Handle case when user given a new password
  if (requestToUpdate.new_password) {
    // Generate salt to hash the password & hashed the password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(requestToUpdate.new_password, salt);

    // Update the hashed password
    requestToUpdate.password = hashPassword;
  }

  try {
    // Update the current user data
    await User.updateOne({ _id: userId }, requestToUpdate);

    res.sendStatus(204);
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during updating user data', error);
  }
};

export default updateCurrentUser;
