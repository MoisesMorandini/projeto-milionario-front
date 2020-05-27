import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  // margin: 0 auto;
  // margin-top: 1%;
  // margin-left: 20px;s
  // margin-right: 20px;
  // border-radius: 10px;
  border: nome;
  // box-shadow: 0px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  // background-color: red;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  heigth: 100%;
  justify-content: center;
  text-align: center;

  img {
    width: 45%;
    margin-bottom: 60px;
    max-width: 189px;
    max-height: 189px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .resetPasswordContainer, .loginContainer {
    width: 100%;
    heigth: 100%;
    max-width: 450px;
    padding: 20px;
  }

  div .inputDiv {
    display: flex;
    // justify-content: flex-start;
    align-items: center;
    // flex-flow: row wrap;
    width: 100%;
    // height: 55px;
    height: 45px;
    margin: 0 0 25px;
    padding-left: 40px;
    background: #f1f1f1;
    border: 0;
    box-shadow: 1px 1px 5px 0px #959595;
    border-color: #707070;
    border-radius: 4px;
    font-size: 25px;
    position: relative;

    input {
      width: 100%;
      background: none;
      border: none;
      font-size: 18px;
      color: #333333;
      // margin-top: 10px;
      padding-right: 5px;
      &::placeholder {
        color: #808080;
      }
    }
  }

  .createAccountContainer {
    width: 100%;
    max-width: 550px;

    img {
      margin-top: 100px;
      margin-bottom: 40px;
    }

    .inputDiv {
      height: 45px;
    }
  }

  .conjunto {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    div.inputDiv {
      width: 49%;
    }
  }

  //  Cor do texto do autocomplete
  input:-webkit-autofill {
    -webkit-text-fill-color: #333333 !important;
  }

  //  Cor do fundo do autocomplete
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #f1f1f1 inset;
  }

  svg {
    position: absolute;
    left: 10px;
    // top: 25%;
    margin-right: 10px;
    color: #575757;
  }

  span {
    position: absolute;
    left: 0px;
    top: 48px;
    color: #DC3545;
    align-self: center;
    font-size: 14px;
    font-weight: bold;
    margin-top: 1px;
  }

  button {
    // margin: 5px 0 0;
    // background: #3b83ff;
    // font-weight: bold;
    // color: #fff;
    // border: 0;
    // border-radius: 4px;
    // font-size: 16px;

    width: 100%;
    height: 55px;
    padding: 10px;
    border-radius: 4px;
    border: 0px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    background: #f04e28;
    transition: background 0.2s;

    &:hover {
      background: ${lighten(0.03, '#F04E28')};
    }
  }

  button:disabled {
    background-color: #ea9f8e;
    color: #fff;
    cursor: default;
  }

  a {
    color: #f04e28;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    opacity: 1;
    &:hover {
      opacity: 0.8;
    }
  }
`;
