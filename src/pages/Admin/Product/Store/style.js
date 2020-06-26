import styled from 'styled-components';
import { TableContainer, Button } from '@material-ui/core';
import { Input } from '@rocketseat/unform';

export const TitleTable = styled.div`
  margin-top: 30px;
  color: #2e2e2e;
  margin-left: 30px;
  display: block;
  font-size: 2em;
  font-weight: bold;
`;

export const ContainerTable = styled.div`
  margin-top: 100px;
`;

export const TableContain = styled(TableContainer)`
  padding-bottom: 50px;
`;

export const ButtonAdd = styled(Button)`
  margin-top: 15px !important;
`;

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
  min-width: max-content;

  &::placeholder {
    color: #808080;
  }
`;

export const ContainerImages = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Image = styled.div`
  margin-bottom: 30px;
  float: right;
  margin-right: 15px;
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

`;
