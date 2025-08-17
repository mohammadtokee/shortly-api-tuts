/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { verifyRefreshToken, generateAccessToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';

/**
 * Types
 */
import type { Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import type { TokenPayload } from '@/lib/jwt';

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  // Retrieve refreshToken from cookies
  const { refreshToken } = req.cookies;

  // Handle case when refresh token doesn't exist
  if (!refreshToken) {
    res.status(401).json({
      code: 'Unauthorized',
      message: 'Refresh token required',
    });
    return;
  }

  try {
    // Get the payload data after verifying token
    const { userId } = verifyRefreshToken(refreshToken) as TokenPayload;

    // Generate new accessToken
    const accessToken = generateAccessToken({ userId });

    // Response the access token with success status
    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    // Handle case when token is expired
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'RefreshTokenExpired',
        message: 'Refresh token expired',
      });
      return;
    }

    // Handle case when token is invalid
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'RefreshTokenError',
        message: 'Invalid refresh token',
      });
      return;
    }

    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during refresh token', error);
  }
};

export default refreshToken;
