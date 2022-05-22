import { UserType } from '../users/entities/user.entity';

export interface IUser {
  id: number;
  name: string;
  email: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}
