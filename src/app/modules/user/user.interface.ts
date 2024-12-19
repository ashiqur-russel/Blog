export interface IUser {
    name: string;
    email: string;
    password: string;
    isBlocked: boolean;
    role: 'admin' | 'user';
    createdAt?: Date;
    updatedAt?: Date;
}
