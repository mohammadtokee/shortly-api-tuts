/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { validationResult } from 'express-validator';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';

/**
 * Express middleware to handle request validation errors.
 *
 * - Uses `express-validator` to check for validation results.
 * - If validation errors are present, responds with HTTP 400 and a JSON object containing error details.
 * - If no validation errors exist, forwards the request to the next middleware.
 */
const validationError = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      code: 'ValidationError',
      errors: errors.mapped(),
    });
    return;
  }

  next();
};

export default validationError;
