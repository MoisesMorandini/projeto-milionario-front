import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  list-style: none;

  li {
    box-shadow: 0 0 10px 0;
    display: flex;
    flex-direction: column;

    background: #dcdcdc;
    border-radius: 10px;
    padding: 20px;

    img {
      align-self: center;

      max-width: 250px;
      max-height: 250px;
    }

    > strong {
      padding-top: 5px;
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #3b83ff;
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
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
