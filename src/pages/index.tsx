import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { Form } from '@unform/web';
import { useCallback, useContext, useRef, useState } from 'react';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import Link from 'next/link';
import { FormHandles } from '@unform/core';

import { Container } from '../../styles/pages/Forms';
import Input from '../components/Input';
import getValidationErrors from '../utils/getValidationErrors';
import { AuthContext } from '../hooks/AuthContext';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        setLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos'),
        });

        await schema.validate({ email, password }, { abortEarly: false });

        signIn({ email, password });

        setLoading(false);
      } catch (error) {
        setLoading(false);

        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <div>
        <h1>Faça seu login</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="password" type="password" placeholder="Senha" />
          <button type="submit">
            {loading ? (
              <Loader type="Bars" height={16} color="#fff" />
            ) : (
              'Entrar'
            )}
          </button>
        </Form>
        <Link href="/signup">
          <a>
            Não tem uma conta? <span>Cadastrar</span>
          </a>
        </Link>
      </div>
    </Container>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = nookies.get(ctx);

  if (cookies['socialmedia.token']) {
    return {
      redirect: {
        destination: '/board',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
