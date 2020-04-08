import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import { darken } from 'polished';

export const InputDefault = styled(Input)`
  & + input {
    margin-bottom: 20px;
  }

  background: #f1f1f1;
  border: 0;
  padding: 15px;
  border-radius: 4px;
  height: 55px;
  color: black;
  margin-right: 30px;
  font-size: 20px;

  &::placeholder {
    color: #808080;
  }
`;
export const InputArea = styled(Input)`
  background: #f1f1f1;
  border: 0;
  padding: 15px;
  border-radius: 4px;
  height: 55px;
  width: 50%;
  color: black;
  margin-right: 30px;
  font-size: 20px;

  &::placeholder {
    color: #808080;
  }
`;
export const Id = styled(Input)`
  display: none;
`;
export const Img = styled.div`
  margin-bottom: 30px;
  float: right;
  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
    img {
      height: 120px;
      width: 120px;
      border-radius: 10px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;

export const Container = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 50px 0px;

  margin: 50px auto 50px;
  padding: 30px;
  justify-content: center;
  align-items: center;

  form {
    margin: 15px;
    border-bottom: 1px solid red;
  }

  select {
    width: 110px;
    height: 45px;
    margin-right: 30px;
  }

  span {
    color: #fb6f91;
    align-self: center;
    margin: 0 0 10px;
    font-weight: bold;
  }

  button {
    margin-right: 30px;
    padding: 0 5px;
    height: 55px;
    width: 160px;
    background: #3b83ff;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    & + button {
      width: 130px;
    }
    &:hover {
      background: ${darken(0.03, '#3b9eff')};
    }
  }
`;
