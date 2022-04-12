import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
};

interface IResponse {
  token: string;
  user: User;
}

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
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const key = "@shortUrl:token";

  const rehydrate = () => {
    const token = localStorage.getItem("@shortUrl:token");
    if (token) {
      const tokenFormatted = JSON.parse(token);
      setToken(tokenFormatted);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post<IResponse>("/auth/me", {
        email,
        password,
      });
      console.log(data);

      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      setToken(data.token);

      localStorage.setItem(key, JSON.stringify(data.token));

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(key);
  };
  const signUp = async (name: string, email: string, password: string) => {
    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      await signIn(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    rehydrate();
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
