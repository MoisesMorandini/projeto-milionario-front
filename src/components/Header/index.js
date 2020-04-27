import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  FaUserAlt,
  FaAngleDown,
  FaAngleRight,
  FaAngleLeft,
} from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { TiThMenu } from 'react-icons/ti';
import {
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

  const profile = null; // useSelector(state => state.user.profile);
  const [departmentVisible, setDepartmentVisible] = useState(false);
  const [departmentIndex, setDepartmentIndex] = useState(0);
  const [departmentSelected, setDepartmentSelected] = useState();
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [oldIndex, setOldIndex] = useState(-1);
  const [category, setCategory] = useState([]);
  const [department, setDepartment] = useState([]);
  const departmentRef = useRef();

  function handleSignOut() {
    dispatch(signOut());
  }

  useEffect(() => {
    async function findDepartmentWithCategory() {
      const response = await apiBack.get('departments/categories');
      setDepartment(response.data);
    }
    findDepartmentWithCategory();
  }, []);
  function setCategoryFalse() {
    setCategoryVisible(false);
  }

  const handleDepartmentClick = event => {
    if (!departmentRef.current.contains(event.target)) {
      setDepartmentVisible(false);
      setCategoryFalse();
    }
  };

  const handleShowDeparment = () => {
    setDepartmentVisible(!departmentVisible);
    setCategoryFalse();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDepartmentClick);
    return () => {
      document.removeEventListener('mousedown', handleDepartmentClick);
    };
  }, []);

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
    } else {
      changeViewCategory(index);
    }
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
            <GiShoppingCart size={40} color="#000000" />
          </Cart>
        </User>
      </Head>
      <Bottom>
        <Department ref={departmentRef}>
          <DepartmentContainer onClick={handleShowDeparment}>
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
              <EachDepartment
                key={dp.id}
                onClick={() => {
                  handleCategoryVisible(index);
                }}
              >
                <DepartmentName>
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
                className="department-tittle-icon"
                categoryVisible={categoryVisible}
                key={departmentSelected}
              >
                <FaAngleLeft size={30} color="666" onClick={setCategoryFalse} />
                <div>
                  <p>{departmentSelected}</p>
                </div>
              </DepartmentTittle>
              {category.map(cat => (
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
    </Container>
  );
}
export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
