import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../types/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;

  const erroSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    success: false,
    statusCode,
    message: 'Invalid ID',
    error: erroSources,
    stack: err.stack,
  };
};

export default handleCastError;
