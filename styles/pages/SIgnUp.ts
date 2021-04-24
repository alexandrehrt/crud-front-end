import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;

  form {
    width: 40rem;
    margin: 0 auto;

    display: grid;
    gap: 2.4rem;

    button {
      padding: 1rem;
      border: none;
      border-radius: 0.4rem;
      background-color: #9966cc;
      color: white;
      font-size: 1.6rem;
      transition: all 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;