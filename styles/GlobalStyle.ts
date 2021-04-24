import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    --purple: #9966cc;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: #f0f8ff;
  }

   a {
     text-decoration: none;
   }

  button {
    cursor: pointer;
  }
`;
