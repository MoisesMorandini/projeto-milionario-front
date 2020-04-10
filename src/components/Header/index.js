import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { FaUserAlt, FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { TiThMenu } from 'react-icons/ti';
import {
  Back,
  Container,
  Cart,
  User,
  Head,
  Bottom,
  Input,
  Profile,
  Department,
  DepartmentList,
  EachDepartment,
  CategoryList,
  EachCategory,
  DepartmentContainer,
  DepartmentName,
  DepartmentTittle,
} from './styles';
import { signOut } from '../../store/modules/auth/actions';
import apiBack from '../../services/apiBack';

function Header({ cartSize }) {
  const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);
  const profile = null;
  const [departmentVisible, setDepartmentVisible] = useState(false);
  const [departmentIndex, setDepartmentIndex] = useState(0);
  const [departmentSelected, setDepartmentSelected] = useState();
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [oldIndex, setOldIndex] = useState(-1);
  const [category, setCategory] = useState([]);
  const [department, setDepartment] = useState([]);
  const [teste, setTeste] = useState(false);
  const node = useRef();

  useEffect(() => {
    async function findDepartmentWithCategory() {
      const response = await apiBack.get('departments/categories');
      setDepartment(response.data);
    }
    findDepartmentWithCategory();
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      setDepartmentVisible(!departmentVisible);
      if (categoryVisible) {
        setCategoryVisible(!categoryVisible);
      }
      return;
    }
    setDepartmentVisible(false);
    // setTeste(true);
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  function handleSignOut() {
    dispatch(signOut());
  }

  // function handleToggleDepartmentVisible() {

  // }

  function changeViewCategory(index) {
    setDepartmentIndex(`${10 + index * 42}px`);
    setDepartmentSelected(department[index].name);
    setCategory(department[index].category);
    setOldIndex(index);
  }

  function handleCategoryVisible(index) {
    if (index === oldIndex || !categoryVisible || oldIndex === -1) {
      setCategoryVisible(!categoryVisible);
      changeViewCategory(index);
    } else { changeViewCategory(index); }
  }

  return (
    <Container>
      <Head>
        <Input>
          <input placeholder="Procure o item que deseja! :)" />
          <button type="button">Pesquisar</button>
        </Input>

        <User to="login">
          <FaUserAlt size={40} color="#000000" onClick={handleSignOut} />
          <div>
            <strong>Bem Vindo(a)!</strong>
            <Profile>{profile ? profile.name : 'Entre ou Cadastre-se'}</Profile>
          </div>
          <Cart to="/">
            <GiShoppingCart size={40} />
          </Cart>
        </User>
      </Head>
      <Bottom>
        <Department ref={node}>
          <DepartmentContainer>
            <div className="department-icon">
              <TiThMenu size={30} color="#ffffff" />
            </div>
            <strong>COMPRE POR departamento</strong>
            <div className="department-icon down">
              <FaAngleDown size={30} color="#ffffff" />
            </div>
          </DepartmentContainer>
          <DepartmentList departmentVisible={departmentVisible}>
            {department.map((dp, index) => (
              <EachDepartment key={dp.id}>
                <DepartmentName
                  onClick={() => {
                    handleCategoryVisible(index);
                  }}
                >
                  <div className="department-iten">
                    <p>{dp.name}</p>
                  </div>
                  <div className="icon">
                    <FaAngleRight size={30} color="666" />
                  </div>
                </DepartmentName>
              </EachDepartment>
            ))}
            <CategoryList
              position={departmentIndex}
              categoryVisible={categoryVisible}
            >
              <DepartmentTittle
                categoryVisible={categoryVisible}
                className="title"
                key={departmentSelected}
              >
                <div>
                  <p>{departmentSelected}</p>
                </div>
              </DepartmentTittle>
              {category.map((cat) => (
                <EachCategory key={cat.id} categoryVisible={categoryVisible}>
                  <div>
                    <p>{cat.name}</p>
                  </div>
                </EachCategory>
              ))}
            </CategoryList>
          </DepartmentList>
        </Department>
      </Bottom>

      {/* <Back to="/">
        <h1>VAGNÃO STORE</h1>
      </Back>
      <Back to="/table">
        <h2>MESAS</h2>
      </Back>
      <Back to="/cue">
        <h2>TACOS</h2>
      </Back>
      <Back to="/ball">
        <h2>BOLAS</h2>
      </Back>
      <Back to="/chalk">
        <h2>GIZ</h2>
      </Back>
      <Back to="/shirt">
        <h2>CAMISAS</h2>
      </Back>
      <Back to="/other">
        <h2>OUTROS</h2>
      </Back>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span> {cartSize} itens</span>
        </div>
        <MdShoppingBasket size={50} color="#FFF" />
      </Cart>
      <User to="login">
        <div>
          <strong>{profile ? profile.name : 'Entrar'}</strong>
        </div>
        <FaUserAlt size={50} color="#FFF" onClick={handleSignOut} />
      </User> */}
    </Container>
  );
}
export default connect((state) => ({
  cartSize: state.cart.length,
}))(Header);
