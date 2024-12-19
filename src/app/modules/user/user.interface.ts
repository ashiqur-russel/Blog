export type TName = {
  firstName: string;
  lastName: string;
};

export interface IUser {
  name: TName;
  email: string;
  password: string;
  isBlocked: boolean;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}
