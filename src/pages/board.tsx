import { GetServerSideProps } from 'next';
import Link from 'next/link';
import nookies from 'nookies';
import { ReactElement, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

import {
  Container,
  Navbar,
  AddUser,
  UsersContainer,
  Card,
  CardIcons,
} from '../../styles/pages/Dashboard';
import UserInfoModal from '../components/UserInfoModal';

interface User {
  user: {
    name: string;
  };
}

const Board = ({ user }: User): ReactElement => {
  const { signOut } = useAuth();

  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const handleOpenUserDetailsModal = () => setIsUserDetailsModalOpen(true);
  const handleCloseUserDetailsModal = () => setIsUserDetailsModalOpen(false);

  const handleSignOut = () => {
    console.log('signout');
    signOut();
  };

  return (
    <Container>
      <Navbar>
        <img
          src="http://vignette2.wikia.nocookie.net/mlg-parody/images/0/05/Doge.png/revision/latest?cb=20151014005818"
          alt="Logo"
        />
        <div>
          <h2>Olá, {user.name}</h2>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </div>
      </Navbar>

      <AddUser>
        <a href="#">Adicionar usuário</a>
      </AddUser>

      <UsersContainer>
        <Card>
          <img
            src="http://vignette2.wikia.nocookie.net/mlg-parody/images/0/05/Doge.png/revision/latest?cb=20151014005818"
            alt="user"
          />
          <p>Nome</p>
          <p>email</p>
          <p>empresa</p>
          <p>data de ingresso</p>
          <p>projetos que participou</p>
          <button type="button" onClick={() => setIsUserDetailsModalOpen(true)}>
            Modal
          </button>

          <CardIcons>
            <button type="button" onClick={() => {}}>
              <img src="/delete.svg" alt="Delete" />
            </button>
            <Link href="#">
              <a>
                <img src="/edit.svg" alt="Edit" />
              </a>
            </Link>
          </CardIcons>
        </Card>

        <Card>
          <img
            src="http://vignette2.wikia.nocookie.net/mlg-parody/images/0/05/Doge.png/revision/latest?cb=20151014005818"
            alt="user"
          />
          <p>Nome</p>
          <p>email</p>
          <p>empresa</p>
          <p>data de ingresso</p>
          <p>projetos que participou</p>
        </Card>

        <Card>
          <img
            src="http://vignette2.wikia.nocookie.net/mlg-parody/images/0/05/Doge.png/revision/latest?cb=20151014005818"
            alt="user"
          />
          <p>Nome</p>
          <p>email</p>
          <p>empresa</p>
          <p>data de ingresso</p>
          <p>projetos que participou</p>
        </Card>
      </UsersContainer>

      <UserInfoModal
        isOpen={isUserDetailsModalOpen}
        onRequestClose={handleCloseUserDetailsModal}
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
  return {
    props: { user: parsedUser },
  };
};
