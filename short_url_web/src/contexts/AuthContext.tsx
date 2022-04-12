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
  loading: boolean;
  authenticated: boolean;
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
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const key = "@shortUrl:token";

  const rehydrate = () => {
    const token = localStorage.getItem("@shortUrl:token");
    if (token) {
      const tokenFormatted = JSON.parse(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${tokenFormatted}`;
      setAuthenticated(true);
    }

    setLoading(false);
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

      localStorage.setItem(key, JSON.stringify(data.token));

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setAuthenticated(true);

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const signOut = () => {
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
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

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, signUp, loading, authenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
