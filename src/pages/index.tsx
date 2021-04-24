import { Form } from '@unform/web';

import { useCallback, useRef } from 'react';
import Input from '../components/Input';

import { Container } from '../../styles/pages/Login';
import api from '../services/api';

const Login: React.FC = () => {
  const formRef = useRef(null);

  const handleSubmit = useCallback(async ({ email, password }) => {
    const user = await api.post('/sessions', { email, password });
    console.log(user);
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
};

export default Login;
