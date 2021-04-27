import { useAuth } from '../hooks/AuthContext';

const Board: React.FC = () => {
  const { user } = useAuth();
  console.log({ user });

  return <h1>Board</h1>;
};

export default Board;
