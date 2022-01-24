import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../../services/api";

interface IAuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  email: string;
  password: string;
}

interface IAuthState {
  accessToken: string;
  user: User;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: User;
  accessToken: string;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem("@Doit:accessToken");
    const user = localStorage.getItem("@Doit:user");

    if (token && user) {
      return {
        accessToken: token,
        user: JSON.parse(user),
      };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      const response = await api.post("/login", { email, password });

      const { accessToken, user } = response.data;

      localStorage.setItem("@Doit:accessToken", accessToken);
      localStorage.setItem("@Doit:user", JSON.stringify(user));

      setData({ accessToken, user });
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@Doit:accessToken");
    localStorage.removeItem("@Doit:user");

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
