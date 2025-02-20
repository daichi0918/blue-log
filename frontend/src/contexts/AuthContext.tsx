"use client";

/**
 * AuthContext
 *
 * @package contexts
 */
import type { FC, ReactNode } from "react";
import { createContext } from "react";
import { useAuth } from "@/hooks/useAuth";
import { type UserType } from "@/type/User";

type Props = {
  children: ReactNode;
};

type ContextInterface = {
  user: UserType | undefined;
  isAuth: boolean;
  signIn: (user: UserType) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as ContextInterface);

/**
 * AuthProvider
 * @param children
 * @returns
 */

export const AuthProvider: FC<Props> = ({ children }) => {
  const { user, isAuth, signIn, signOut } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
