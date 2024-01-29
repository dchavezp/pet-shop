export type UserModel = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export enum UserRole {
  MANAGER = 'MANAGER',
  CLIENT = 'CLIENT',
}
