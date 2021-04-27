import { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import Link from 'next/link';

import Input from '../components/Input';

import { Container } from '../../styles/pages/LoginAndSignUp';
import api from '../services/api';
import getValidationErrors from '../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const notify = (message: string) => {
    message === 'error'
      ? toast.error('Ops, algo deu errado!', {
          toastId: 'I cannot be duplicated',
        })
      : toast.success('Usuário cadastrado com sucesso!', {
          toastId: 'I cannot be duplicated either',
        });
  };

  const handleSubmit = useCallback(async ({ name, email, password }) => {
    try {
      formRef.current?.setErrors({});

      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha deve ter no mínimo 6 digítos'),
      });

      await schema.validate({ name, email, password }, { abortEarly: false });

      await api.post('/users/create', { name, email, password });

      notify('success');

      setLoading(false);
    } catch (error) {
      notify('error');

      setLoading(false);

      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <div>
        <h1>Faça seu cadastro</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Digite seu nome" />
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
        <Link href="/">
          <a>
            Voltar ao <span>login</span>
          </a>
        </Link>
        <ToastContainer style={{ fontSize: '1.8rem' }} />
      </div>
    </Container>
  );
};

export default SignUp;
