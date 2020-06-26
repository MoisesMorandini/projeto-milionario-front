import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  FaUserAlt,
  FaAngleDown,
  FaAngleRight,
  FaAngleLeft,
  FaUser,
  FaDoorOpen,
} from 'react-icons/fa';
import {
  MdShoppingCart,
  MdKeyboardArrowDown,
  MdAssignment,
  MdLocationOn,
  MdStore,
  MdAdd,
} from 'react-icons/md';
import { TiThMenu, TiUserAdd } from 'react-icons/ti';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { GiExitDoor } from 'react-icons/gi';
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
  LinkMenu,
  ButtonDropdown,
} from './styles';
import { signOut } from '../../store/modules/auth/actions';
import apiBack from '../../services/apiBack';
import history from '~/services/history';
import { store } from '~/store';

function Header() {
  const dispatch = useDispatch();
  const signed = useSelector((state) => state.auth.signed);

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
  const { user } = store.getState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

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
          <FaUserAlt size={40} color="#000000" />
          <div>
            <Profile>
              {user.profile ? (
                <div>
                  <ButtonDropdown onClick={handleClick}>
                    <p>Olá,</p>
                    {user.profile.name} <MdKeyboardArrowDown />
                  </ButtonDropdown>

                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {user.profile ? (
                      <>
                        {user.profile.administrator ? (
                          <LinkMenu to="/admin">
                            <StyledMenuItem>
                              <ListItemIcon>
                                <MdStore />
                              </ListItemIcon>
                              <ListItemText primary="Painel Administrativo" />
                            </StyledMenuItem>
                          </LinkMenu>
                        ) : (
                          ''
                        )}
                      </>
                    ) : (
                      ''
                    )}
                    <LinkMenu to="/my-request">
                      <StyledMenuItem>
                        <ListItemIcon>
                          <MdAssignment fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Meus Pedidos" />
                      </StyledMenuItem>
                    </LinkMenu>
                    <LinkMenu to="/user/address">
                      <StyledMenuItem>
                        <ListItemIcon>
                          <MdLocationOn fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Endereços" />
                      </StyledMenuItem>
                    </LinkMenu>
                    <LinkMenu to="/user/address">
                      <StyledMenuItem>
                        <ListItemIcon>
                          <FaUser fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Minha Conta" />
                      </StyledMenuItem>
                    </LinkMenu>
                    <StyledMenuItem onClick={handleSignOut}>
                      <ListItemIcon>
                        <GiExitDoor fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Sair" />
                    </StyledMenuItem>
                  </StyledMenu>
                </div>
              ) : (
                <>
                  <a onClick={handleClick}>
                    <strong>Olá, faça o seu login</strong>
                    <strong>ou cadastre-se <MdKeyboardArrowDown /> </strong>
                  </a>
                  <div>
                    <StyledMenu
                      id="customized-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <LinkMenu to="/login">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <FaDoorOpen fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Entrar" />
                        </StyledMenuItem>
                      </LinkMenu>
                      <LinkMenu to="/register">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <TiUserAdd fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Cadastrar-se" />
                        </StyledMenuItem>
                      </LinkMenu>
                    </StyledMenu>
                  </div>
                </>
              )}
            </Profile>
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
                ) : (
                  <div />
                )}
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
