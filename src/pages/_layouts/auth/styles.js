import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 700px;
  width: 550px;
  background: white;
  display: block;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 0px 50px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 450px;

  justify-content: center;
  text-align: center;

  img {
    width: 65%;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  input {
    background: #f1f1f1;
    border: 0;
    border-radius: 4px;
    height: 55px;
    padding: 15px;
    color: black;
    margin: 0 0 20px;

    font-size: 20px;
    &::placeholder {
      color: #808080;
    }
  }

  span {
    color: #fb6f91;
    align-self: center;

    margin: 0 0 10px;
    font-weight: bold;
  }

  button {
    margin: 5px 0 0;
    height: 55px;
    background: #3b83ff;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.03, '#3b9eff')};
    }
  }

  a {
    color: #3b83ff;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;
