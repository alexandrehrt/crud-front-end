import Modal from 'react-modal';

function UserInfoModal({ isOpen, onRequestClose }): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '100%',
          maxWidth: '100rem',
          overflow: 'hidden',
          height: '50rem',
          margin: '4rem auto',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <div>
        <p>Nome</p>
        <p>email</p>
        <p>empresa</p>
        <p>data de ingresso</p>
        <p>projetos que participou</p>
      </div>
    </Modal>
  );
}

export default UserInfoModal;
