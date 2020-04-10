import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.header`
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
`;

export const Head = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5%;
  @media (max-width: 1400px) {
    margin-left: 10%;
  }
  @media (max-width: 450px) {
    margin: 0;
  }
  @media (max-width: 1150px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div {
      margin-bottom: 3%;
    }
  }
`;

export const Input = styled.div`
  flex-grow: 0;
  width: 700px;
  height: 40px;
  @media (max-width: 1050px) {
    width: 600px;
  }
  @media (max-width: 850px) {
    width: 400px;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 450px) {
    width: 300px;
  }
  background-color: #ffffff;
  display: flex;
  padding-left: 5px;
  border-width: 1px 0px 1px 1px;
  border-style: solid;
  border-color: #707070;
  border-radius: 10px;
  input {
    padding: 5px;
    width: 560px;
    @media (max-width: 1050px) {
      width: 460px;
    }
    @media (max-width: 850px) {
      width: 360px;
    }
    @media (max-width: 450px) {
      width: 260px;
    }
    border: none;
    border-radius: 10px;
    color: #989898;
  }

  button {
    width: 140px;
    height: 38px;
    padding: 5px;
    background-color: #ff0000;
    border: none;
    border-radius: 10px;
    color: #ffffff;
  }
`;

export const User = styled(Link)`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: opacity 0.2s;
  margin-left: 5%;
  @media (max-width: 1300px) {
    margin-left: 2%;
    width: 100%;
  }
  &:hover {
    opacity: 0.8;
  }
  div {
    margin-left: 10px;
    strong {
      display: block;
      color: #000000;
      @media (max-width: 1300px) {
        font-size: 14px;
      }
    }
  }
`;
export const Profile = styled.strong`
  text-decoration: underline;
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  margin-left: 30px;
  &:hover {
    opacity: 0.8;
  }
  div {
    text-align: right;
    margin-right: 10px;
    @media (max-width: 400px) {
      margin-right: 0px;
    }
    strong {
      display: block;
      color: #fff;
    }
    span {
      font-size: 16px;
      color: #f1f1f1;
    }
  }
`;

export const Bottom = styled.div`
  height: 50px;
  width: 100%;
  background-color: ${darken(0, '#ffffff')};
`;

export const Department = styled.div`
  height: 50px;
  width: 400px;
  background-color: #ff0000;
  margin: 0px;
  margin-left: 10%;
  @media (max-width: 950px) {
    width: 350px;
    margin-left: 3%;
  }
  @media (max-width: 400px) {
    width: 300px;
    margin-left: 3%;
  }
  position: relative;
  :hover {
    cursor: pointer;
  }
`;

export const DepartmentContainer = styled.div`
  position: absolute;
  height: 50px;
  width: 400px;
  display: flex;
  @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 400px) {
    width: 300px;
    margin-left: 3%;
  }
  .department-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 3%;
    margin-left: 3%;
  }
  strong {
    width: 100%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    @media (max-width: 950px) {
      font-size: 16px;
    }
    text-transform: uppercase;
  }
`;
export const DepartmentList = styled.ul`
  position: absolute;
  display: ${props => (props.departmentVisible ? 'flex' : 'none')};

  flex-direction: column;
  top: calc(100%);
  background-color: #fff;

  li:first-child {
    margin-top: 3%;
  }
`;

export const EachDepartment = styled.li`
  width: 400px;
  height: 30px;
  position: relative;
  margin-bottom: 3%;
  @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 400px) {
    width: 300px;
  }
`;

export const DepartmentName = styled.div`
  width: 400px;
  height: 30px;
  display: flex;
  align-items: center;

  @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 400px) {
    width: 300px;
  }
  &:hover {
    background-color: #e1e1e1;
  }

  .department-iten {
    margin-left: 3%;
  }

  .icon {
    position: absolute;
    left: 91%;
  }

  p {
    font-size: 20px;
    color: #666;
  }
`;
export const CategoryList = styled.ul`
  @media (max-width: 950px) {
    width: 350px;
  }
  position: absolute;
  flex-direction: column;
  left: 100%;
  @media (max-width: 725px) {
    left: 50%;
  }
  top: ${props => props.position};
  width: 400px;
  border-left: 1px solid #f1f1f1;
  box-shadow: ${props =>
    props.categoryVisible ? `-5px 0px 10px 1px #666` : 'none'};
  box-shadow: 0;
  background-color: #fff;
  div:last-child {
    margin-bottom: 3%;
  }
  .title {
    text-decoration: underline !important;
    color: #666;
    font-size: 24px;
    font-weight: bold;
    padding: 0;
    padding-left: 2%;
  }
`;

export const EachCategory = styled.li`
  height: 30px;
  margin: 3% 3% 0 3%;
  padding: 2%;
  .title {
    padding: 0;
  }
  display: ${props => (props.categoryVisible ? 'flex' : 'none')};
  @media (max-width: 725px) {
    display: 'none';
  }
  p {
    color: #666;
  }
  :hover {
    background-color: #e1e1e1;
  }
`;

// export const Back = styled(Link)`
//   flex-grow: 0;
//   text-shadow: 1px 1px;
//   text-decoration-line: none;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   color: #f1f1f1;
//   h1 {
//     font-size: 30px;
//   }
//   h2 {
//     font-size: 25px;
//   }
//   &:hover {
//     border-radius: 10px;
//     opacity: 0.5;
//   }
// `;
