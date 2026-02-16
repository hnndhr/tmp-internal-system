import { UserRole } from './database';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface CreateUserInput {
  username: string;
  password: string;
  role: UserRole;
}

export interface UserSession {
  user: User;
  accessToken: string;
}

