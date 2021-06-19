import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;

  div {
    display: grid;
    place-items: center;
  }

  h1 {
    color: var(--purple);
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  form {
    width: 40rem;
    display: grid;
    gap: 2.4rem;

    button {
      margin-bottom: 2rem;
      padding: 1rem;
      border: none;
      border-radius: 0.4rem;
      background-color: var(--purple);
      color: white;
      font-size: 1.6rem;
      transition: all 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  a {
    font-size: 1.6rem;
    color: black;

    span {
      color: var(--purple);
      font-weight: 600;
    }
  }
`;
