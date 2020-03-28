import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';
import produce from 'immer';

export const CheckoutButton = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px auto 30px auto;

  .checkout-button {
    width: 200px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    background: #3b83ff;
    color: #f1f1f1;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    &:hover {
      background: ${darken(0.03, '#3b83ff')};
    }
  }
`;
export const Id = styled.input`
  display: none;
`;

export const Address = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 20px;

  background: white;
  border-radius: 10px;
  padding: 15px 15px;

  h3 {
    color: #3b83ff;
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
    font-size: 22px;
  }

  label {
    display: block;
    color: black;
    font-size: 15px;
    font-weight: bold;
  }

  input {
    width: 100%;
    background: #f1f1f1;
    border-radius: 5px;
    padding: 15px 10px;
    margin-top: 8px;
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

export const PaymentData = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  background: white;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 20px;
  grid-template-areas:
    'header header'
    'header header'
    'header header'
    'main sidebar';

  .title {
    grid-area: header;
    color: #3b83ff;
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
    font-size: 30px;
  }
  .cards {
    grid-area: header;
  }

  .save-card {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
    font-size: 18px;
    color: ${darken(0.1, '#3b83ff')};

    input {
      margin-right: 5px;
    }
  }

  .form-area {
    grid-area: main;
    padding: 15px;
    & > label,
    div.group label {
      display: block;
      color: black;
      font-size: 15px;
      font-weight: bold;
    }

    & > input,
    div.group input {
      width: 100%;
      background: #f1f1f1;
      border-radius: 5px;
      padding: 15px 10px;
      margin-top: 8px;
      font-size: 16px;
      margin-bottom: 15px;
    }

    .group {
      width: 100%;
      display: grid;
      grid-template-columns: auto auto;
      grid-column-gap: 20px;

      div {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .credit-card {
    display: flex;
    align-items: center;
    grid-area: sidebar;
  }
`;

const loadingAnimation = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }

  50% {
    transform: scale(1.0);
  }
}`;

export const Loading = styled.span`
  width: 20px;
  height: 20px;
  position: relative;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;

    animation: ${loadingAnimation} 2s infinite ease-in-out;
  }

  &::after {
    animation-delay: -1s;
  }
`;
