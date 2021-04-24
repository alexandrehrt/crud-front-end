import { Form } from '@unform/web';

import { useCallback, useRef } from 'react';
import Input from '../components/Input';

import { Container } from '../../styles/pages/Login';
import api from '../services/api';

const SignUp: React.FC = () => {
  const formRef = useRef(null);

  const handleSubmit = useCallback(async ({ name, email, password }) => {
    const user = await api.post('/users/create', { name, email, password });
    console.log({ user });
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Digite seu nome" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <button type="submit">Registrar</button>
      </Form>
    </Container>
  );
};

export default SignUp;
