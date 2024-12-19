import { TErrorSource, TGenericErrorResponse } from '../types/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    success: false,
    statusCode,
    message: 'Invalid ID',
    error: errorSources,
  };
};

export default handleDuplicateError;