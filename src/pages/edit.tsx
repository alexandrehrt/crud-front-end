import { useRef, useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Loader from 'react-loader-spinner';
import nookies from 'nookies';
import * as Yup from 'yup';

import { useAuth } from '../hooks/AuthContext';
import { Container } from '../../styles/pages/Forms';
import Input from '../components/Input';
import api from '../services/api';

interface Employee {
  id: string;
  name: string;
  email: string;
  job: string;
  profile_picture: string;
}

interface EditProps {
  employee: Employee;
  token: string;
}

function EditUser({ employee, token }: EditProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { notify } = useAuth();

  const handleSubmit = useCallback(
    async ({ id, name, email, job, profilePicture }) => {
      try {
        setLoading(true);

        const schema = Yup.object().shape({
          name: Yup.string(),
          email: Yup.string().email('Digite um e-mail válido'),
          job: Yup.string(),
          profilePicture: Yup.string(),
        });

        await schema.validate(
          { name, email, job, profilePicture },
          { abortEarly: false },
        );

        await api.patch(
          `employee/${employee.id}`,
          {
            id,
            name,
            email,
            job,
            profile_picture: profilePicture,
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
        notify('error');
        setLoading(false);
        console.log(error);
      }
    },
    [employee.id, token, notify],
  );

  return (
    <Container>
      <div>
        <h1>Editar funcionário</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nome"
            defaultValue={employee.name}
          />
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            defaultValue={employee.email}
          />
          <Input
            name="job"
            type="text"
            placeholder="Cargo"
            defaultValue={employee.job}
          />
          <Input
            name="profilePicture"
            type="text"
            placeholder="URL da foto de perfil"
            defaultValue={employee.profile_picture}
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

export default EditUser;

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

  const { id } = ctx.query;

  const employee = await api.get(`employee/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies['socialmedia.token']}`,
    },
  });

  return {
    props: { employee: employee.data, token: cookies['socialmedia.token'] },
  };
};
