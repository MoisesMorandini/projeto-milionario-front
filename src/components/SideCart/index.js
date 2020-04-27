import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { GiShoppingCart } from 'react-icons/gi';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { FaAngleRight, FaRegSadTear } from 'react-icons/fa';
import * as CartActions from '../../store/modules/cart/actions';
import { addInstallments, addTotal } from '~/store/modules/purchase/actions';
import { formatPrice } from '../../util/format';
import {
  ContainerMobile,
  Container,
  HeaderCart,
  ProductTableCart,
  ProductList,
  Scroll,
  Bottom,
} from './styles';

function SideCart({
  cart,
  total,
  totalRaw,
  removeFromCart,
  updateAmountRequest,
}) {
  const [scroll, setScroll] = useState('71%');
  const [fullCart, setFullCart] = useState(true);
  const [marginTop, setMarginTop] = useState(20);
  const [sizeCartIcon, setSizeCartIcon] = useState(50);

  const handleMarginTop = (value) => {
    if (value < 699) {
      setMarginTop(10);
    } else if (value < 510) {
      setMarginTop(10);
    } else {
      setMarginTop(0);
    }
  };

  const getUserValueScroll = value =>
    scroll.substring(0, scroll.length - 1) - parseInt(value / 15);

  const handlePositionCart = event => {
    const value = document.documentElement.scrollTop;
    let valueScrool;
    if (window.screen.height < 800 || window.screen.width < 1500) {
      setSizeCartIcon(40);
    } else {
      setSizeCartIcon(50);
    }

    if (window.screen.height < 950 && value < 99) {
      setScroll('680px');
      return;
    }

    if (value > 99) {
      handleMarginTop(value);
      valueScrool = getUserValueScroll(value);

      if (valueScrool < 10) {
        return;
      }
      setScroll(`${valueScrool}%`);
    } else {
      setScroll('71%');
    }
  };
  const handleMobile = () => {
    setFullCart(!fullCart);
  };
  useEffect(() => {
    document.addEventListener('scroll', handlePositionCart);
  }, []);

  const increment = (product) => {
    updateAmountRequest(product.id, product.amount + 1);
  };

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }
  return (
    <>
      <ContainerMobile
        sizeTop={scroll}
        marginTop={marginTop}
        fullCart={fullCart}
        onClick={() => handleMobile()}
      >
        <GiShoppingCart size={40} className="icon-cart" />
      </ContainerMobile>
      <Container sizeTop={scroll} fullCart={fullCart} marginTop={marginTop}>
        <div className="container-cart">
          <HeaderCart>
            {!fullCart ? (
              <FaAngleRight
                size={40}
                onClick={() => handleMobile()}
                className="icon-right"
              />
            ) : null}

            <GiShoppingCart size={sizeCartIcon} className="icon-cart" />
            <p>Meu carrinho</p>
          </HeaderCart>
          <Scroll>
            <ProductTableCart fullCart={fullCart}>
              {cart.length == 0 ? (
                <div className="cart-no-content">
                  <p>Carrinho Vazio</p>
                </div>
              ) : (
                <tbody>
                  {cart.map((product) => (
                    <tr>
                      <td className="product-img">
                        <img src={product.file.url} alt={product.file.name} />
                      </td>
                      <td className="product-info">
                        <strong>{product.name}</strong>
                        <span>{product.priceFormatted}</span>
                      </td>
                      <td>
                        <div>
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <MdDelete size={20} color="#d9534f" />
                          </button>

                          <button
                            type="button"
                            className="btn-minus"
                            onClick={() => decrement(product)}
                          >
                            <MdRemoveCircleOutline size={20} color="#00b400" />
                          </button>
                          <input
                            className="input-amount"
                            readOnly
                            value={product.amount}
                          />
                          <button
                            type="button"
                            className="btn-plus"
                            onClick={() => increment(product)}
                          >
                            <MdAddCircleOutline size={20} color="#00b400" />
                          </button>
                        </div>
                        <input
                          className="input-amount-mobile"
                          readOnly
                          value={product.amount}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </ProductTableCart>
          </Scroll>
          <Bottom>
            <span>
              Valor total do pedido: <span className="price"> {total}</span>
            </span>
            <button>Finalizar Carrinho</button>
          </Bottom>
        </div>
      </Container>
    </>
  );
}

const mapStateToPros = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
  totalRaw: state.cart.reduce(
    (total, product) => total + product.price * product.amount,
    0
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToPros, mapDispatchToProps)(SideCart);
