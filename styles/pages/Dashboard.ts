import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Navbar = styled.nav`
  padding: 1.4rem 4rem;
  margin-bottom: 4rem;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    border-radius: 50%;
    height: 5rem;
  }

  div {
    display: flex;
    align-items: center;

    button {
      padding: 0.8rem;
      margin-left: 2rem;
      background: transparent;
      border: none;
      color: red;
      transition: all 0.2s;

      :hover {
        color: white;
        background: red;
        border-radius: 0.8rem;
      }
    }
  }
`;

export const AddUser = styled.div`
  padding: 1.4rem 4rem;
  display: flex;
  justify-content: flex-end;
  transition: opacity 0.2s;

  a {
    background: var(--purple);
    padding: 1rem;
    font-size: 1.6rem;
    color: white;
    border-radius: 0.8rem;
    margin-right: 0.8rem;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const UsersContainer = styled.div`
  padding: 1.4rem 4rem;
  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
`;

export const Card = styled.div`
  max-width: 40rem;
  background-color: white;
  padding: 2rem;
  border-radius: 0.8rem;
  font-size: 1.8rem;
  color: gray;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;

  img {
    height: 30rem;
    max-width: 100%;
    border-radius: 0.8rem;
  }

  &:hover {
    transform: translateY(-10px);
  }
`;

export const CardIcons = styled.div`
  width: 100%;
  display: flex;

  button {
    border: none;
    margin-right: 0.8rem;

    &:hover {
      background-color: #a9a9a9;
    }
  }

  img {
    height: 1.5rem;
    width: 1.5rem;

    &:hover {
      color: red;
    }
  }
`;

export const EmptyMessage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  h1 {
    color: white;
  }
`;
