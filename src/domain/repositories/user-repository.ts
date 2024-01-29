import { UserModel } from '../model';

export interface UserRepository {
  getUserByEmail(email: string): Promise<UserModel>;
  updateRefreshToken(email: string, refreshToken: string): Promise<void>;
}
