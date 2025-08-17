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
import config from '@/config';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Utils
 */
import { generateMongooseId } from '@/utils';

/**
 * Types
 */
import type { Request, Response } from 'express';
import type { IUser } from '@/models/user';
type RequestBody = Pick<IUser, 'name' | 'email' | 'password' | 'role'>;

const register = async (req: Request, res: Response): Promise<void> => {
  // Retrieve name, email, password, and role from request body
  const { name, email, password, role } = req.body as RequestBody;

  // Handle case when random user wants to create an admin account
  if (role === 'admin' && !config.WHITELISTED_EMAILS?.includes(email)) {
    res.status(400).json({
      code: 'BadRequest',
      message: 'You are not allowed to create an admin account',
    });

    return;
  }

  /**
   * Generate salt to hash the password
   */
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    // Generate custom userId
    const userId = generateMongooseId();

    // Generate refreshToken for registered user
    const refreshToken = generateRefreshToken({ userId });

    // Generate accessToken for registered user
    const accessToken = generateAccessToken({ userId });

    // Insert a new user document in database with provided credentials
    const user = await User.create({
      _id: userId,
      name,
      email,
      password: hashPassword,
      role,
      refreshToken,
    });

    // Response refreshToken in cookies
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
        passwordResetToken: user.passwordResetToken,
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
    logger.error('Error during register a user', error);
  }
};

export default register;
