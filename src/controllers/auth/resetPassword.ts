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
import { verifyPasswordResetToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import nodemailerTransport from '@/lib/nodemailer';
import { passResetInfoTemplate } from '@/mailTemplates/passResetInfo';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import type { Request, Response } from 'express';
import type { ResetLinkPayload } from '@/lib/jwt';
import type { IUser } from '@/models/user';
type RequestQuery = { token: string };
type RequestBody = Pick<IUser, 'password'>;

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  // Get the request query e.g. token
  const { token } = req.query as RequestQuery;

  // Get the password from request body
  const { password } = req.body as RequestBody;

  try {
    // Retrieve the reset token payload (email) or throw an error
    const { email } = verifyPasswordResetToken(token) as ResetLinkPayload;

    // Find the user with given email and select password
    const user = await User.findOne({ email })
      .select('password passwordResetToken name')
      .exec();

    // Handle case when your not found with this email
    if (!user) return;

    // Handle case when token doesn't exist in user model
    if (!user.passwordResetToken) {
      res.status(404).json({
        code: 'TokenNotFound',
        message: 'This token is already used',
      });
      return;
    }

    // Hash the password to update in database
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // Store updated user password and passwordResetToken to null in database
    user.password = hashPassword;
    user.passwordResetToken = null;
    await user.save();

    // Response with a 204 success status
    res.sendStatus(204);

    // Send the email to user
    await nodemailerTransport.sendMail({
      from: '"Shortly" <contact@codewithsadee.com>',
      to: email,
      subject: 'Password Successfully Reset',
      html: passResetInfoTemplate({
        name: user.name,
      }),
    });
  } catch (error) {
    // Handle case when token is expired
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'ResetTokenExpired',
        message: 'Your password reset toke has been expired',
      });
      return;
    }

    // Handle case when token is invalid
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'ResetTokenError',
        message: 'Invalid reset password token',
      });
      return;
    }

    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during resetting password', error);
  }
};

export default resetPassword;
