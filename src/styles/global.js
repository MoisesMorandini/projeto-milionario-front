import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

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
    background: linear-gradient(-150deg, #EAEAEA, #EAEAEA) no-repeat;
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

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
  }

  ul{
    list-style: none;
  }
  button{
    padding: 0;
    border: 0;
    margin: 0;
    cursor: pointer;
  }
`;
