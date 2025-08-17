/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import { verifyAccessToken } from '@/lib/jwt';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { TokenPayload } from '@/lib/jwt';

const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Retrieve authorization from request headers
  const { authorization } = req.headers;

  // Handle case when client doesn't send request with accessToken
  if (!authorization) {
    res.status(401).json({
      code: 'AccessTokenError',
      message: 'Access token is required',
    });
    return;
  }

  // Retrieve only token from authorization
  const [_, accessToken] = authorization.split(' ');

  try {
    // Get the userId from jwt payload
    const { userId } = verifyAccessToken(accessToken) as TokenPayload;

    // Send the userId to next controller function
    req.userId = userId;

    next();
  } catch (error) {
    // Handle case when accessToken expired
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AccessTokenExpired',
        message: 'Access token expired',
      });
      return;
    }

    // Handle case when accessToken is invalid
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AccessTokenError',
        message: 'Invalid access token',
      });
      return;
    }

    // Response with a 500 status for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error while authenticating a user', error);
  }
};

export default authentication;
