/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import config from '@/config';
import { generateBackHalf } from '@/utils';

/**
 * Models
 */
import Link from '@/models/link';

/**
 * Types
 */
import type { Request, Response } from 'express';
import type { ILink } from '@/models/link';
type RequestBody = Pick<ILink, 'title' | 'destination' | 'backHalf'>;

const createShortLink = async (req: Request, res: Response): Promise<void> => {
  // Get the userId from request
  const userId = req.userId;

  // Get the link from request
  const {
    title,
    destination,
    backHalf = generateBackHalf(),
  } = req.body as RequestBody;

  try {
    // Insert a new link document in database
    const link = await Link.create({
      title,
      destination,
      backHalf,
      shortLink: `${config.CLIENT_ORIGIN}/${backHalf}`,
      creator: userId,
    });

    // Send success status with link
    res.status(200).json({ link });
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during generating link', error);
  }
};

export default createShortLink;
