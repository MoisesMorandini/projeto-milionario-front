import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';
import './style.css';
import { Link } from 'react-router-dom';
import apiBack from '~/services/apiBack';

function Cart({
  cart, total, totalRaw, removeFromCart, updateAmountRequest,
}) {
  const cartState = useSelector((state) => state.cart);
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }
  async function handleBuy() {
    try {
      const cartIdAmount = [];
      cartState.forEach((c) => {
        cartIdAmount.push({ id: c.id, amount: c.amount });
      });

      const response = await apiBack.post('users/buy', {
        userAddress: 1,
        cart: cartIdAmount,
      });
      window.location = response.data;
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className="cart">
      {cart.map((product) => (
        <div className="product-cart">
          <article>
            <div className="divImage">
              <Link to={`/product/${product.id}`}>
                <img src={product.file.url} alt={product.name} />
              </Link>
            </div>
            <br />
            <div className="product-info">
              <Link to={`/product/${product.id}`}>
                <strong id="nameProd">{product.name}</strong>
              </Link>
              <br />
              <div>
                <span>
                  <strong>Valor unidade: </strong>
                  {product.priceFormatted}
                </span>
              </div>
            </div>

            <div className="divInput">
              <button type="button" onClick={() => decrement(product)}>
                <MdRemoveCircleOutline size={20} color="#3b83ff" />
              </button>
              <input type="number" readOnly value={product.amount} />
              <button type="button" onClick={() => increment(product)}>
                <MdAddCircleOutline size={20} color="#3b83ff" />
              </button>
              <br />
              <span>{product.stock} disponíveis</span>
            </div>
            <div className="total">
              <span>
                <strong>Valor total</strong> <br /> {product.subtotal}
              </span>
              <br />
            </div>
            <button type="button" onClick={() => removeFromCart(product.id)}>
              <MdDelete size={25} color="#3b83ff" />
            </button>
          </article>
        </div>
      ))}

      <div className="finish">

        <div className="button">
          <button onClick={() => handleBuy()}>Finalizar pedido</button>
        </div>
        <div className="total">
          <strong>Total: </strong>
          <span>{total}</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToPros = (state) => ({
  cart: state.cart.map((product) => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0,
    ),
  ),
  totalRaw: state.cart.reduce(
    (total, product) => total + product.price * product.amount,
    0,
  ),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(CartActions, dispatch);

export default connect(mapStateToPros, mapDispatchToProps)(Cart);
