import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { darken } from 'polished';
export const Container = styled.header`
  display: flex;
  /*background: linear-gradient(240deg, #006400, #8fbc8f) no-repeat;*/
  background: linear-gradient(180deg, #006400, #8fbc8f) no-repeat;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  border-radius: 10px;
  padding: 15px;
`;

export const Back = styled(Link)`
  text-shadow: 1px 1px;
  text-decoration-line: none;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #f1f1f1;
  h1 {
    font-size: 30px;
  }
  h2 {
    font-size: 25px;
  }
  &:hover {
    border-radius: 10px;
    opacity: 0.5;
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }
    span {
      font-size: 16px;
      color: #f1f1f1;
    }
  }
`;

export const User = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }
    span {
      font-size: 16px;
      color: #f1f1f1;
    }
  }
`;
