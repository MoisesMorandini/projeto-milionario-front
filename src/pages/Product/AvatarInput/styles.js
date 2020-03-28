import styled, { css } from 'styled-components';
export const Avatar = styled.div`
  margin-bottom: 30px;
  float: right;
  label {
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
    ${props =>
      props.none &&
      css`
        cursor: auto;
        opacity: 1;
        &:hover {
          opacity: 1;
        }
      `}
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
