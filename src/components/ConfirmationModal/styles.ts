import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 2.4rem;
  }

  p {
    font-size: 1.6rem;
  }

  div {
    width: 100%;
    margin-top: 3.3rem;
    display: flex;
    justify-content: flex-end;

    button {
      width: 17.6rem;
      padding: 0.8rem;
      background-color: transparent;
      font-size: 1.4rem;
      font-weight: 600;
    }

    button ~ button {
      margin-left: 2.4rem;
      border: none;
      background-color: red;
      color: #fff;
      transition: all 0.2s;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: 0;
  background-color: transparent;
  padding: 0;
`;
