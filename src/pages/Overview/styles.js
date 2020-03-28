import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  color: #333;
  h3 {
    font-size: 25px;
  }
  table {
    width: 100%;
    margin-bottom: 30px;
    tr {
      th {
        font-size: 25px;
        text-transform: uppercase;
        text-align: left;
      }
    }
    td {
      margin-bottom: 5px;
    }

    td {
      font-size: 22px;

      color: #999;
      img {
        width: 140px;
      }
    }
    tfoot {
      margin: 150px;

      td {
        color: #333;
      }
    }
  }
  hr {
    margin-bottom: 30px;
    color: #3b83ff;
  }
`;
