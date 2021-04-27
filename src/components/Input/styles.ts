import styled from 'styled-components';

export const Container = styled.div`
  input {
    width: 100%;
    padding: 1rem;
    border: none;
    border-bottom: 1px solid #000;
    font-size: 1.6rem;
    background-color: transparent;
    caret-color: var(--purple);

    &:focus {
      border-bottom: 1px solid var(--purple);

      &::placeholder {
        color: var(--purple);
      }
    }
  }

  p {
    font-size: 1.4rem;
    color: red;
    margin-top: 0.6rem;
  }
`;
