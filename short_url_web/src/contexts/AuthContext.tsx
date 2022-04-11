import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextProps {
  user: User | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  signUp(name: string, email: string, password: string): Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/accounts/authenticate", {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const signOut = () => {};
  const signUp = async (name: string, email: string, password: string) => {};

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
