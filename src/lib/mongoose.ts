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
import { logger } from '@/lib/winston';

/**
 * Types
 */
import type { ConnectOptions } from 'mongoose';

/**
 * Mongo connection options
 **/
const connectionOption: ConnectOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
  dbName: 'shortly',
};

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * - Verifies that the MongoDB connection string exists in the configuration.
 * - Attempts to connect using the provided connection options.
 * - Logs a success message if the connection is established.
 * - Catches and logs any connection errors.
 *
 * @throws Error if the MongoDB connection string is missing in the configuration.
 */
const connectDatabase = async (): Promise<void> => {
  // Handle case when connection string does not exist.
  if (!config.MONGO_CONNECTION_URI) {
    throw new Error('Mongo URI is missing');
  }

  try {
    await mongoose.connect(config.MONGO_CONNECTION_URI, connectionOption);
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect database', error);
  }
};

/**
 * Gracefully disconnects from the MongoDB database.
 *
 * - Uses Mongoose to terminate the active database connection.
 * - Catches and logs any errors that occur during disconnection.
 */
const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    logger.error('Error during disconnecting from database', error);
  }
};

export { connectDatabase, disconnectDatabase };
