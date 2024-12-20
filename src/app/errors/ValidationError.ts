import { TErrorSource } from '../types/error';
import mongoose from 'mongoose';

const handleMongooseValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;

  const errorSources: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    success: false,
    statusCode,
    message: 'Validation Error',
    err: errorSources,
  };
};

export default handleMongooseValidationError;
