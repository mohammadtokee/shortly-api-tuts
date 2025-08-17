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

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
type Role = 'user' | 'admin';

const authorization = (role: Role[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // Extract userId from request object
    const userId = req.userId;

    try {
      // Find the user by id
      const user = await User.findById(userId).select('role').lean().exec();

      // Handle case when user not found
      if (!user) {
        res.status(403).json({
          code: 'AuthorizationError',
          message: `You don't have an account, please register to get access`,
        });
        return;
      }

      // Handle case when user doesn't have the role to access
      if (!role.includes(user.role)) {
        res.status(403).json({
          code: 'AuthorizationError',
          message: 'Unauthorized access',
        });
        return;
      }

      next();
    } catch (error) {
      // Response with a 500 status code for unexpected server errors
      res.status(500).json({
        code: 'ServerError',
        message: 'Internal server error',
      });

      // Log the error details to the logger for debugging and monitoring
      logger.error('Error during authorization', error);
    }
  };
};

export default authorization;
