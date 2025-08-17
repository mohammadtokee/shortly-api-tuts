/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import mongoose from 'mongoose';

/**
 * Custom modules
 */
import config from '@/config';

/**
 * Types
 */
import type { GenLinkProps } from '@/types';
type GenPrevLinkProps = Omit<GenLinkProps, 'total'>;

/**
 * Generate custom mongoose id
 */
export const generateMongooseId = () => new mongoose.Types.ObjectId();

/**
 * Generate backHalf
 */
export const generateBackHalf = (length: number = 5): string => {
  const char: string =
    '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIKJLMNOPQRSTUVWXYZ';
  let backHalf: string = '';

  for (let i = 0; i < length; i++) {
    backHalf += char[Math.floor(Math.random() * char.length)];
  }

  return backHalf;
};

/**
 * Generates the URL for the next page in a paginated API response.
 * Returns null if there is no next page.
 */
export const generateNextLink = ({
  baseUrl,
  search,
  sortby,
  offset,
  limit,
  total,
}: GenLinkProps): string | null => {
  // If there are no more items to fetch, return null
  if (total <= limit + offset) {
    return null;
  }

  // Construct base URL
  const origin =
    config.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://api.shortly.codewithsadee.com';
  const url = new URL(`${origin}${baseUrl}/my-links`);
  const params = new URLSearchParams();

  // Add query parameters
  if (search) params.set('search', search);
  if (sortby) params.set('sortby', sortby);
  params.set('offset', String(offset + limit));
  params.set('limit', String(limit));

  // Attach query params to URL and return full link
  url.search = params.toString();

  return url.toString();
};

/**
 * Generates the URL for the previous page in a paginated API response.
 */
export const generatePrevLink = ({
  baseUrl,
  search,
  sortby,
  offset,
  limit,
}: GenPrevLinkProps): string | null => {
  // Return null if there's no more item to fetch
  if (offset <= 0) {
    return null;
  }

  // Construct base URL
  const origin =
    config.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://api.shortly.codewithsadee.com';
  const url = new URL(`${origin}${baseUrl}/my-links`);
  const params = new URLSearchParams();

  // Add query parameters
  if (search) params.set('search', search);
  if (sortby) params.set('sortby', sortby);
  params.set('offset', String(offset - limit <= 0 ? 0 : offset - limit));
  params.set('limit', String(limit));

  // Attach query params to URL and return full link
  url.search = params.toString();

  return url.toString();
};
