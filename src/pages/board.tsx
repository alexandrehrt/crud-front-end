import { GetServerSideProps } from 'next';
import { useCallback, ReactElement, useState } from 'react';
import Link from 'next/link';
import nookies from 'nookies';

// import { useAuth } from '../hooks/AuthContext';

import {
  Container,
  AddUser,
  UsersContainer,
  Card,
  CardIcons,
  EmptyMessage,
} from '../../styles/pages/Dashboard';
import ConfirmationModal from '../components/ConfirmationModal';
import Navbar from '../components/Navbar';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  job: string;
  profile_picture: string;
}

interface Props {
  user: User;
  employees: Employee[];
  token: string;
}

const Board = ({ user, employees, token }: Props): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState();

  const handleDeleteEmployee = useCallback(async id => {
    setIsModalOpen(true);
    setEmployeeId(id);
  }, []);

  return (
    <Container>
      <Navbar user={user} />

      <AddUser>
        <Link href="/create">
          <a>Adicionar funcionário</a>
        </Link>
      </AddUser>

      <UsersContainer>
        {employees ? (
          employees.map(employee => (
            <Card key={employee.id}>
              <img src={employee.profile_picture} alt="Employee" />
              <p>{employee.name}</p>
              <p>{employee.email}</p>
              <p>{employee.job}</p>

              <CardIcons>
                <button
                  type="button"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  <img src="/delete.svg" alt="Delete" />
                </button>
                <Link
                  href={{
                    pathname: '/edit',
                    query: { id: employee.id },
                  }}
                >
                  <a>
                    <img src="/edit.svg" alt="Edit" />
                  </a>
                </Link>
              </CardIcons>
            </Card>
          ))
        ) : (
          <EmptyMessage>
            <h1>Wow, tão vazio!</h1>
          </EmptyMessage>
        )}
      </UsersContainer>

      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        id={employeeId}
        token={token}
      />
    </Container>
  );
};

export default Board;

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

  const user = cookies['socialmedia.user'];
  const parsedUser = JSON.parse(user);

  const employees = await api.get('employees', {
    headers: {
      Authorization: `Bearer ${cookies['socialmedia.token']}`,
    },
  });

  return {
    props: {
      user: parsedUser,
      employees: employees.data,
      token: cookies['socialmedia.token'],
    },
  };
};
