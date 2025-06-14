import { errorLogger } from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  errorLogger.error(err);

  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errorCode: err.code || 'UNKNOWN_ERROR',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;