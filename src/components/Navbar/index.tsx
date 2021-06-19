import Link from 'next/link';
import { useAuth } from '../../hooks/AuthContext';

import { Container } from './styles';

interface User {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

function Navbar({ user }: User): JSX.Element {
  const { signOut } = useAuth();

  return (
    <Container>
      <Link href="/board">
        <a>
          <img src="/random-company-logo.png" alt="Logo" />
        </a>
      </Link>
      <div>
        <h2>Olá, {user.name}</h2>
        <button type="button" onClick={() => signOut()}>
          Sair
        </button>
      </div>
    </Container>
  );
}
export default Navbar;
