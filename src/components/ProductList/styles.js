import styled from 'styled-components';
import { darken } from 'polished';
import { Pagination } from '@material-ui/lab';

export const Container = styled.div`
  display: inline;
  .loading {
    margin-top: 10%;
    margin-left: 30%;
  }

  @media (max-width: 1220px) {
    .loading {
      margin-left: 50%;
    }
  }
  @media (max-width: 700px) {
    .loading {
      margin-left: 40%;
    }
  }
`;

export const CustomPagination = styled(Pagination)`
  margin-left: 35%;
  margin-bottom: 5%;
  @media (max-width: 400px) {
    margin-left: 25%;
  }
`;
export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 245px);
  grid-gap: 1em;
  padding-bottom: 1%;
  margin: 2% 0 0 5%;
  list-style: none;

  @media (min-width: 2100px) {
    grid-template-columns: repeat(6, 245px);
  }
  @media (max-width: 1880px) {
    grid-template-columns: repeat(4, 245px);
  }
  @media (max-width: 1505px) {
    grid-template-columns: repeat(3, 245px);
  }
  @media (max-width: 1220px) {
    grid-template-columns: repeat(4, 245px);
  }
  @media (max-width: 1120px) {
    justify-content: space-evenly;
    margin-left: 0;
    grid-template-columns: repeat(3, auto);
  }
  @media (max-width: 910px) {
    grid-template-columns: repeat(2, auto);
  }
  @media (max-width: 565px) {
    grid-template-columns: repeat(1, 245px);
  }

  li {
    display: flex;
    flex-direction: column;
    width: 235px;
    height: 380px;
    background: #ffffff;
    border-radius: 4px;
    padding: 5%;

    .link{
      height: 300px;
      display: flex;
      flex-direction: column;
      padding: 5%;
    }
    img {
      border-radius: 4px;
      border: 1px solid #f1f1f1;
      align-self: center;
      width: 156px;
      height: 156px;
    }

    a > strong {
      font-size: 16px;
      line-height: 20px;
      color: rgb(102, 102, 102);
      padding-top: 20px;
      margin-top: 5px;
    }
    .installments{
      padding-top: 0;
      margin-top: 0;
      font-size: 16px;
      line-height: 20px;
      color: rgb(102, 102, 102);
    }
    a > span {
      color: rgb(51, 51, 51);
      font-size: 24px;
      font-weight: bold;
      margin: 5px 0 0 0;
    }
    .installments-cart{
      padding: 5% 0 5% 5%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    button {
      width: 48px;
      display: flex;
      align-items: center;
      background: #3b9eff;
      color: #fff;
      margin-left: 5%;
      border: 0;
      border-radius: 4px;
      margin-top: auto;
      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;


export const NotFoundContainer = styled.div`
  display:flex;
  margin-left:5%;
  margin-top: 5%;
  align-items:center;
`;

export const NotFoundText = styled.div`
  margin-left: 2%;
  P{
    color: #666666;
    font-size: 4em;
  }

  @media (max-width: 1020px) {
    p{
      font-size: 3em;
    }
  }
  @media (max-width: 600px) {
    p{
      font-size: 2em;
    }
  }

`;
