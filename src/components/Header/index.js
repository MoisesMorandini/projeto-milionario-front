import React from 'react';
import { connect, useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { Back, Container, Cart, User } from './styles';
import { signOut } from '../../store/modules/auth/actions';
import { useDispatch } from 'react-redux';
function Header({ cartSize }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    console.tron.log('disparei');
    dispatch(signOut());
  }
  return (
    <Container>
      <Back to="/">
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
      </User>
    </Container>
  );
}
export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
