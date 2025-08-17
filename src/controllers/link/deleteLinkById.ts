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
 * Types
 */
import type { Request, Response } from 'express';

const deleteLinkById = async (req: Request, res: Response): Promise<void> => {
  // Extract userId from request
  const userId = req.userId;

  // Retrieve the dynamic params form params
  const { linkId } = req.params;

  try {
    // Check if the link with the given ID exists in the database
    const isLinkAvailable = await Link.exists({ _id: linkId }).exec();

    // If not found, respond with 404 Not Found
    if (!isLinkAvailable) {
      res.status(404).json({
        code: 'NotFound',
        message: 'This link is not available',
      });
      return;
    }

    // Check if the requested user is creator of this link
    const isLinkCreator = await Link.exists({
      _id: linkId,
      creator: userId,
    }).exec();

    // If so, response with 403 access denied
    if (!isLinkCreator) {
      res.status(403).json({
        code: 'AccessDenied',
        message: "You don't have permission to delete this link",
      });
      return;
    }

    // Delete the requested link form database
    await Link.deleteOne({ _id: linkId });

    res.sendStatus(204);
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during delete link by id', error);
  }
};

export default deleteLinkById;
