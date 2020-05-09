import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  z-index: 0;
  margin-top: 2%;
  margin-bottom: 100px;
  .container-carousel {
    position: relative;
    margin: 0 5%;
    height: 400px;
    width: 90%;
    padding: 0;
  }
  .carousel .thumb img {
    position: relative;
    padding: 0;
  }

  .carousel .slide img {
    background-color: none;
    height: 400px;
    width: 100%;
    margin: 0;
  }

  @media (max-width: 900px) {
    .container-carousel {
      height: 300px;
    }
    .carousel .slide img {
      height: 300px;
    }
  }
  @media (max-width: 500px) {
    .container-carousel {
      height: 200px;
    }
    .carousel .slide img {
      height: 200px;
    }
  }
  .indicator {
    background-color: #eaeaea;
    padding: 0px;
    margin: 0px;
  }

  .color {
    background-color: #eaeaea;
  }
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 245px);
  grid-gap: 1em;
  padding-bottom: 5%;
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

  a {
    color: inherit;
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    flex-direction: column;
    width: 235px;
    height: 380px;
    background: #ffffff;
    border-radius: 4px;
    padding: 5%;
    img {
      border-radius: 4px;
      border: 1px solid #f1f1f1;
      align-self: center;
      width: 156px;
      height: 156px;
    }

    a > strong {
      padding-top: 20px;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 20px;
      color: rgb(90, 90, 90);
      margin-top: 5px;
      align-self: center;
    }

    > span {
      color: rgb(51, 51, 51);
      font-size: 24px;
      font-family: Helvetica, Arial, sans-serif;
      font-weight: bold;
      margin: 5px 0 15px 0;
      align-self: center;
    }

    button {
      background: #3b9eff;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.3s;
      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
      }
      span {
        font-weight: bold;
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
