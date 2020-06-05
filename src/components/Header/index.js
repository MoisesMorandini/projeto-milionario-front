import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  FaUserAlt,
  FaAngleDown,
  FaAngleRight,
  FaAngleLeft,
} from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
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
  GoCategory,
  Logotipo,
} from './styles';
import { signOut } from '../../store/modules/auth/actions';
import apiBack from '../../services/apiBack';
import history from '~/services/history';


function Header() {
  const dispatch = useDispatch();
  const signed = useSelector((state) => state.auth.signed);

  const profile = null; // useSelector(state => state.user.profile);
  const [departmentVisible, setDepartmentVisible] = useState(false);
  const [departmentIndex, setDepartmentIndex] = useState(0);
  const [departmentSelected, setDepartmentSelected] = useState();
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [oldIndex, setOldIndex] = useState(-1);
  const [category, setCategory] = useState([]);
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const departmentRef = useRef();
  const [logo, setLogo] = useState({});

  useEffect(() => {
    async function getLogo() {
      const response = await apiBack.get('/logo/main');
      setLogo(response.data.file);
    }
    getLogo();
  }, []);

  function handleSignOut() {
    // eslint-disable-next-line no-unused-expressions
    signed ? dispatch(signOut()) : history.push('/login');
  }

  useEffect(() => {
    async function findDepartmentWithCategory() {
      setLoading(true);
      const response = await apiBack.get('department/category');
      setDepartment(response.data);
      setLoading(false);
    }
    findDepartmentWithCategory();
  }, []);

  function setCategoryFalse() {
    setCategoryVisible(false);
  }

  const handleDepartmentClick = (event) => {
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
        <Link to="/">
          <Logotipo src={logo.url} alt="Projeto Milionário" />
        </Link>

        <Input>
          <input placeholder="Procure o item que deseja! :)" />
          <button type="button">Pesquisar</button>
        </Input>

        <User>
          <FaUserAlt size={40} color="#000000" onClick={handleSignOut} />
          <div>
            <strong>Bem Vindo(a)!</strong>
            <Profile>{profile ? profile.name : 'Entre ou Cadastre-se'}</Profile>
          </div>
          <Cart to="/cart">
            <MdShoppingCart size={40} color="#000000" />
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
            {!loading ? (
              <>
                {' '}
                {department.length ? (
                  <>
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
                        <FaAngleLeft
                          size={30}
                          color="666"
                          onClick={setCategoryFalse}
                        />
                        <div>
                          <p>{departmentSelected}</p>
                        </div>
                      </DepartmentTittle>
                      {category.map((cat) => (
                        <EachCategory
                          key={cat.id}
                          categoryVisible={categoryVisible}
                        >
                          <GoCategory
                            to={`/list/${cat.id}`}
                            onClick={handleShowDeparment}
                          >
                            <p>{cat.name}</p>
                          </GoCategory>
                        </EachCategory>
                      ))}
                    </CategoryList>
                  </>
                ) : (<div />)}
              </>
            ) : (
              <CircularProgress />
            )}
          </DepartmentList>
        </Department>
      </Bottom>
    </Container>
  );
}

const mapStateToPros = (state) => ({
  cartSize: state.cart.length,
});

export default connect(mapStateToPros)(Header);
