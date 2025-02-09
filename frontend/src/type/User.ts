export type AuthResponseType = {
  user: UserType;
  accessToken: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  image?: string;
};
