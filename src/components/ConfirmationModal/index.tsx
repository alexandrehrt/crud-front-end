import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';

import { Container, CloseButton } from './styles';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string;
  token: string;
}

function ConfirmationModal({
  isOpen,
  onRequestClose,
  id,
  token,
}: Props): JSX.Element {
  const router = useRouter();
  const { notify } = useAuth();

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.reload();
      onRequestClose();
    } catch (error) {
      onRequestClose();
      notify('error');
      console.log(error);
    }
  }, [onRequestClose, id, token, router, notify]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '50%',
          maxWidth: '100rem',
          overflow: 'hidden',
          height: '25rem',
          margin: '12rem auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <CloseButton type="button" onClick={onRequestClose}>
        <img src="/close.svg" alt="Fechar modal" />
      </CloseButton>

      <Container>
        <h1>Excluir usuário</h1>
        <p>Tem certeza que deseja excluir este usuário?</p>
        <div>
          <button type="button" onClick={onRequestClose}>
            Cancelar
          </button>
          <button type="button" onClick={handleDelete}>
            Excluir
          </button>
        </div>
      </Container>
    </Modal>
  );
}

export default ConfirmationModal;
