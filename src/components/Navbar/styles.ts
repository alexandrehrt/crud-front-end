import styled from 'styled-components';

export const Container = styled.nav`
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
