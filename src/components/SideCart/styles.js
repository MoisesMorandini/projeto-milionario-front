import styled from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { darken } from 'polished';

export const ContainerMobile = styled.div`
  display: none;
  @media (max-width: 1220px) {
    display: ${(props) => (props.fullCart ? 'flex' : 'none')};
  }
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: ${darken(0.04, '#00b400')};
  color: #eaeaea;
  position: fixed;
  right: 5%;
  top: ${(props) => props.sizeTop};
`;

export const GlobalContainer = styled.div``;
export const Container = styled.div`
  @media (max-width: 1220px) {
    display: ${(props) => (props.fullCart ? 'none' : 'flex')};
  }
  position: fixed;
  top: ${(props) => props.sizeTop};
  right: 5%;
  max-height: 455px;
  width: 23%;
  min-width: 350px;
  max-width: 430px;
  background-color: #ffffff;

  .container-cart {
    display: flex;
    flex-direction: column;
  }
  @media (max-height: 950px) {
    margin-top: ${(props) => props.marginTop}%;
  }
  @media (max-width: 1030px) {
    min-width: 320px;
  }
  @media (max-width: 700px) {
    min-width: 288px;
  }
`;

export const HeaderCart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${darken(0.04, '#00b400')};
  color: #eaeaea;
  height: 82px;
  width: 100%;
  border-radius: 4px;
  .icon-cart {
    margin-left: 12%;
    margin-right: 10%;
  }
  .icon-right {
    margin-left: 5px;
  }
  p {
    font-size: 34px;
  }
  @media (max-width: 1550px) {
    .icon-cart {
      margin-left: 8%;
      margin-right: 7%;
    }
  }
  @media (max-width: 1030px) {
    .icon-cart {
      margin-left: 2%;
      margin-right: 6%;
    }
   width: 320px;
  }

  @media (max-width: 700px) {
    height: 68px;
    p {
      font-size: 24px;
    }
    .icon-cart {
      margin-right: 4%;
    }
    width: 288px;
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  max-height: 270px;
`;

export const ProductTableCart = styled.table`
  margin-top: 10px;
  margin-left: 16px;
  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    border-bottom: 1px solid #eee;
  }
  .product-info {
    margin-top: 7%;
    width: 210px;
  }
  img {
    height: 65px;
    width: 65px;
    border: 1px solid #eee;
    border-radius: 1px;
  }
  @media (max-width: 700px) {
    margin-left: 8px;
    img {
      height: 55px;
      width: 55px;
    }
  }
  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 35px;
    }
  }

  button {
    background: none;
    border: 0px;
    padding: 6px;
  }
  .input-amount-mobile {
    display: none;
  }
  @media (max-width: 700px) {
    div {
      display: flex;
    }
    .btn-remove {
      order: 1;
      padding: 4px 4px 0px 4px;
    }
    .btn-minus {
      order: 2;
      padding: 4px 4px 0px 4px;
    }
    .btn-plus {
      order: 3;
      padding: 4px 6px 0px 4px;
    }
    .input-amount {
      display: none;
    }

    .input-amount-mobile {
      display: flex;
      text-align: center;
      align-self: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 35px;
      margin-left: 28%;
      margin-bottom: 6px;
    }
  }
`;
export const ProductList = styled.div``;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 20px;
    .price {
      color: ${darken(0.01, '#00b400')};
    }
  }

  button {
    background-color: ${darken(0.04, '#00b400')};
    border-radius: 4px;
    margin: 10px;
    padding: 0;
    height: 40px;
    width: 300px;
    border: none;
    color: #ffffff;
  }
  @media (max-width: 700px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    span {
      font-size: 16px;
      margin-left: 15%;
      padding-right: 5px;
    }
    .price {
      margin-left: 23%;
    }
    button {
      margin-bottom: 10px;
      width: 200px;
    }
  }
`;
export const NotFoundContainer = styled.div`
  height: 184px;
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;
`;

export const NotFoundText = styled.div`
  p {

    color: #666666;
    font-size: 2.5em;
  }
  @media (max-width: 800px) {
    p{
      font-size: 2em;
    }
  }

`;
