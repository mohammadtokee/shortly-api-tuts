/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import config from '@/config';
import { generatePasswordResetToken } from '@/lib/jwt';
import nodemailerTransport from '@/lib/nodemailer';
import { resetLinkTemplate } from '@/mailTemplates/resetLink';

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

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  // Get the email from request body
  const { email } = req.body as RequestBody;

  try {
    // Get password reset token
    const passwordResetToken = generatePasswordResetToken({ email });

    // Find the user by the email address and select name
    const user = await User.findOne({ email })
      .select('name passwordResetToken')
      .exec();

    // Handle case when user not found
    if (!user) return;

    // Send the reset token to user email
    await nodemailerTransport.sendMail({
      from: '"Shortly" <contact@codewithsadee.com>',
      to: email,
      subject: 'Password Reset Request',
      html: resetLinkTemplate({
        name: user.name,
        resetLink: `${config.CLIENT_ORIGIN}/reset-password?token=${passwordResetToken}`,
      }),
    });

    // Store the reset token in user data and save
    user.passwordResetToken = passwordResetToken;
    await user.save();

    // Response with 204 no-content
    res.sendStatus(204);
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during sending reset link to email', error);
  }
};

export default forgotPassword;
