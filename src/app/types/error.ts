export type TErrorSource = {
    path: string | number;
    message: string;
  }[];
  
  export type TGenericErrorResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    error: TErrorSource;
    stack?: string;
  };