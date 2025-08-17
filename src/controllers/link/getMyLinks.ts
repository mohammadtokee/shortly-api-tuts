/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import { generateNextLink, generatePrevLink } from '@/utils';

/**
 * Models
 */
import Link from '@/models/link';

/**
 * Types
 */
import type { Request, Response } from 'express';
import type { RequestQuery, LinkField } from '@/types';
import type { SortOrder } from 'mongoose';

const getMyLinks = async (req: Request, res: Response): Promise<void> => {
  // Retrieve the userId from request object
  const userId = req.userId;

  // Retrieve queries from request body
  const {
    search = '',
    sortby = 'createdAt_desc',
    offset = 0,
    limit = 100,
  } = req.query as RequestQuery;

  // Regex for search in db
  const searchRegex = new RegExp(`\\b${search}\\b`, 'gi');

  // Split sortby into field and order (e.g., 'createdAt_desc' ➜ ['createdAt', 'desc'])
  const [sortField, sortOrder] = sortby.split('_') as [LinkField, SortOrder];

  try {
    // Query the Link collection:
    // - Filter by title using the search regex
    // - Sort based on the specified field and order
    // - Apply lean() for better performance by returning plain JavaScript objects
    const links = await Link.find({ creator: userId })
      .where('title', searchRegex)
      .sort({ [sortField]: sortOrder })
      .select('-__v')
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();

    // Count total number of document that match the search criteria
    const total = await Link.countDocuments({ creator: userId })
      .where('title', searchRegex)
      .exec();

    // Generate the next page link for pagination
    const nextLink = generateNextLink({
      baseUrl: req.baseUrl,
      search,
      sortby,
      offset: Number(offset),
      limit: Number(limit),
      total,
    });

    // Generate the previous page link for pagination
    const prevLink = generatePrevLink({
      baseUrl: req.baseUrl,
      search,
      sortby,
      offset: Number(offset),
      limit: Number(limit),
    });

    // Sent the result as JSON response
    res.status(200).json({
      total,
      offset: Number(offset),
      limit: Number(limit),
      next: nextLink,
      prev: prevLink,
      links,
    });
  } catch (error) {
    // Response with a 500 status code for unexpected server errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    // Log the error details to the logger for debugging and monitoring
    logger.error('Error during get user links', error);
  }
};

export default getMyLinks;
