import { User } from '@prisma/client';

export type ResponseUserType = Omit<
  User,
  'password' | 'twitter' | 'facebook' | 'github' | 'profile'
>;
