/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import config from '@/config';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';
import type { IUser } from '@/models/user';
type RequestBody = Pick<IUser, 'email'>;

const login = async (req: Request, res: Response): Promise<void> => {
  // Extract email address from request body
  const { email } = req.body as RequestBody;

  try {
    // Get the user using provided email address
    const user = await User.findOne({ email }).exec();

    // return if user doesn't found
    if (!user) return;

    // Generate refreshToken for new login
    const refreshToken = generateRefreshToken({ userId: user._id });

    // Generate accessToken for new login
    const accessToken = generateAccessToken({ userId: user._id });

    // Insert new refreshToken in user data
    user.refreshToken = refreshToken;
    await user.save();

    // Response refreshToken in cookie
    res.cookie('refreshToken', refreshToken, {
      maxAge: config.COOKIE_MAX_AGE,
      httpOnly: config.NODE_ENV === 'production',
      secure: true,
    });

    // Response with success status, accessToken and userInfo
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during account login', error);
  }
};

export default login;
