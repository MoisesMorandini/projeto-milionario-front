import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  z-index: 0;
  margin-top: 2%;
  margin-bottom: 100px;

  .container-carousel{
    margin: 0 5%;
    height: 400px;  /* change this to whatever you want */
    width: 90%;
    padding: 0;
  }
  .carousel .thumb img {
    position: relative;
    padding: 0;
  }

  .carousel .slide  img {
      background-color: none;
      height: 400px;  /* change this to whatever you want */
      width: 100%;
      margin: 0 ;
  }
  .indicator {
    background-color: #EAEAEA;
    padding: 0px;
    margin: 0px;
  }

  .color  {
    background-color: #EAEAEA;
  }
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5%;
  padding-bottom: 5%;

  @media(max-width: 1700px){
    grid-template-columns: repeat(3, 1fr);
  }
  @media(max-width: 1500px){
    grid-template-columns: repeat(2, 1fr);
  }

  margin: 2% 0 0 5%;
  width: 375px;
  height: 250px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;

    background: #ffffff;
    border-radius: 4px;
    padding: 15px;

    img {
      border-radius: 4px;
      border: 1px solid #f1f1f1;
      align-self: center;
      width: 250px;
      height: 200px;
    }

    > strong {
      padding-top: 5px;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 24px;
      font-family: Helvetica, Arial, sans-serif;
      font-weight: bold;
      margin: 5px 0 15px 0;
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

        svg {
          margin-right: 5px;
        }
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
