/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

/**
 * Custom modules
 */
import config from '@/config';
import corsOptions from '@/lib/cors';
import { logger, logtail } from '@/lib/winston';
import { connectDatabase, disconnectDatabase } from '@/lib/mongoose';

/**
 * Routes
 */
import router from '@/routes';

/**
 * Initial express
 */
const server = express();

/**
 * Use cors
 */
server.use(cors(corsOptions));

/**
 * Secure headers
 */
server.use(helmet());

/**
 * Parse JSON request bodies
 */
server.use(express.json());

/**
 * Parse URL encoded-bodies
 */
server.use(express.urlencoded({ extended: true }));

/**
 * Set the public folder
 */
server.use(express.static(`${__dirname}/public`));

/**
 * Cookie parser
 */
server.use(cookieParser());

/**
 * Compress response
 */
server.use(compression());

// Immediately Invoked Async Function to initialize the application
(async function (): Promise<void> {
  try {
    // Establish a connection to the MongoDB database
    await connectDatabase();

    // Register application routes under the root path
    server.use('/', router);

    // Start the server and listen on the configured port
    server.listen(config.PORT, () => {
      logger.info(`Server listening at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    // Log a critical error if server startup fails
    logger.error('Failed to start server', error);

    // In production, exit the process to avoid running in an unstable state
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

// Handles graceful server shutdown on termination signals (e.g., SIGTERM, SIGINT)
const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    // Disconnect from the MongoDB database
    await disconnectDatabase();

    // Log a warning indicating the server is shutting down
    logger.info('Server shutdown', signal);

    // Flush any remaining logs to Logtail before exiting
    logtail.flush();

    // Exit the process cleanly
    process.exit(0);
  } catch (error) {
    // Log any errors that occur during the shutdown process
    logger.error('Error during server shutdown', error);
  }
};

// Listen for termination signals and trigger graceful shutdown
process.on('SIGTERM', serverTermination);
process.on('SIGINT', serverTermination);
