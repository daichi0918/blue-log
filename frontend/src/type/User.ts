export type AuthResponseType = {
  user: UserType;
  accessToken: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  image?: string;
  twitter?: string;
  github?: string;
  facebook?: string;
  profile?: string;
  followers?: Array<number>;
  following?: Array<number>;
  followerCount: number;
  followingCount: number;
};
