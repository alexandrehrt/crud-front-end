import { GetServerSideProps } from 'next';
import { useRef, useCallback, useState } from 'react';
import nookies from 'nookies';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Loader from 'react-loader-spinner';

import { useAuth } from '../hooks/AuthContext';
import { Container } from '../../styles/pages/Forms';
import Input from '../components/Input';
import api from '../services/api';
import getValidationErrors from '../utils/getValidationErrors';

interface IToken {
  token: string;
}

function CreateUser({ token }: IToken): JSX.Element {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { notify } = useAuth();

  const handleSubmit = useCallback(
    async ({ name, email, job, profilePicture }) => {
      try {
        setLoading(true);

        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          email: Yup.string()
            .required('Campo obrigatório')
            .email('Digite um e-mail válido'),
          job: Yup.string().required('Campo obrigatório'),
          profilePicture: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(
          { name, email, job, profilePicture },
          { abortEarly: false },
        );

        await api.post(
          '/employee/create',
          {
            name,
            email,
            job,
            profilePicture,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        notify('success');
        setLoading(false);
      } catch (error) {
        // notify('error');
        setLoading(false);
        // console.log(error);
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
    },
    [token, notify],
  );

  return (
    <Container>
      <div>
        <h1>Adicionar funcionário</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nome" />
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="job" type="text" placeholder="Cargo" />
          <Input
            name="profilePicture"
            type="text"
            placeholder="URL da foto de perfil"
          />
          <button type="submit">
            {loading ? (
              <Loader type="Bars" height={16} color="#fff" />
            ) : (
              'Enviar'
            )}
          </button>
        </Form>
      </div>
    </Container>
  );
}

export default CreateUser;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = nookies.get(ctx);

  if (!cookies['socialmedia.token']) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const token = cookies['socialmedia.token'];
  return {
    props: { token },
  };
};
