import { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  user: Record<string, unknown>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@Socialmedia:token');
      const user = localStorage.getItem('@Socialmedia:user');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        return { token, user: JSON.parse(user) };
      }
    }
    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      try {
        const response = await api.post('sessions', { email, password });
        const { token, user } = response.data;

        localStorage.setItem('@Socialmedia:token', token);
        localStorage.setItem('@Socialmedia:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData(response.data);
        await router.push('board');
      } catch (error) {
        console.log(error);
      }
    },
    [router],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Navedex:token');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};
