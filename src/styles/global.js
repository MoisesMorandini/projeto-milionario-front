import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 0;
  }

  body{
    background: linear-gradient(-150deg, green, green) no-repeat;
    background-attachment: fixed;

    -webkit-font-smoothing: antialiased;
  }

  body, input, button{
    font: 14px 'Roboto',  sans-serif;
  }

  #root{
    width: 100%;
    margin: 0 auto;
  }

  html, body, #root{
    height: 100%;
  }

  a {
    text-decoration: none;
  }

  ul{
    list-style: none;
  }

  button{
    cursor: pointer;
  }
`;
