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
import Link from '@/models/link';

/**
 * Type
 */
import type { Request, Response } from 'express';
import type { ILink } from '@/models/link';
type RequestBody = Pick<ILink, 'title' | 'destination' | 'backHalf'>;

const updateLinkById = async (req: Request, res: Response): Promise<void> => {
  // Retrieve linkId from request params
  const { linkId } = req.params;

  // Retrieve userId from request
  const userId = req.userId;

  // Get the properties to update
  const requestToUpdate = req.body as RequestBody;

  try {
    // Check if the link with the given ID exists in the database
    // If not found, respond with 404 Not Found
    const isLinkAvailable = await Link.exists({ _id: linkId }).exec();

    if (!isLinkAvailable) {
      res.status(404).json({
        code: 'NotFound',
        message: 'This link is not available',
      });
      return;
    }

    // Check requested user is owner of this link
    const isLinkCreator = await Link.exists({
      _id: linkId,
      creator: userId,
    }).exec();

    if (!isLinkCreator) {
      res.status(403).json({
        code: 'AccessDenied',
        message: "You don't have permission to modify this link",
      });
      return;
    }

    // Update the link with requested data
    await Link.updateOne({ _id: linkId }, requestToUpdate);

    res.sendStatus(204);
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during updating link', error);
  }
};

export default updateLinkById;
