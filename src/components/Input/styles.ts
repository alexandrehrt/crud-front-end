import styled from 'styled-components';

export const Container = styled.div`
  input {
    width: 100%;
    padding: 1rem;
    border: none;
    border-bottom: 1px solid black;
    font-size: 1.6rem;
    background-color: transparent;

    &:focus {
      border-bottom: 1px solid #9966cc;

      &::placeholder {
        color: #9966cc;
      }
    }
  }
`;
