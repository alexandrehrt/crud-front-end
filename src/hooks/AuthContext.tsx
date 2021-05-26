import { createContext, ReactElement, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie, destroyCookie } from 'nookies';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  notify: (message: string) => void;
}

interface Children {
  children: ReactElement;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: Children): ReactElement => {
  const router = useRouter();

  const notify = (message: string) => {
    message === 'error'
      ? toast.error('Ops, algo deu errado!', {
          toastId: 'I cannot be duplicated',
        })
      : toast.success('Usuário cadastrado com sucesso!', {
          toastId: 'I cannot be duplicated either',
        });
  };

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      try {
        const response = await api.post('signin', { email, password });
        const { user, token } = response.data;

        setCookie(undefined, 'socialmedia.token', token, {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: '/',
        });

        setCookie(undefined, 'socialmedia.user', JSON.stringify(user), {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: '/',
        });

        api.defaults.headers.authorization = `Bearer ${token}`;

        await router.push('board');
      } catch (error) {
        notify('error');
        console.log(error);
      }
    },
    [router],
  );

  const signOut = useCallback(() => {
    destroyCookie(null, 'socialmedia.token');
    destroyCookie(null, 'socialmedia.user');

    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        notify,
      }}
    >
      {children}
      <ToastContainer style={{ fontSize: '1.8rem' }} />
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};
