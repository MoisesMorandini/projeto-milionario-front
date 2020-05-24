import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import * as CartActions from '../../store/modules/cart/actions';
import { addInstallments, addTotal } from '~/store/modules/purchase/actions';
import { formatPrice } from '../../util/format';
import './style.css';
import { Link } from 'react-router-dom';

function Cart({
  cart, total, totalRaw, removeFromCart, updateAmountRequest,
}) {
  const dispatch = useDispatch();
  const [installments, setInstallments] = useState(1);
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }
  function renderInstallments() {
    return [...new Array(4)].map((item, idx) => {
      const installment = idx + 1;
      return (
        <option value={installment}>
          {`${installment} x ${formatPrice(totalRaw / installment)}`}
        </option>
      );
    });
  }

  function handlePurchase() {
    dispatch(addInstallments(installments));
    dispatch(addTotal(totalRaw));
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
        <div className="select">
          <select
            onChange={(e) => setInstallments(e.target.value)}
            className="select"
          >
            {renderInstallments()}
          </select>
        </div>
        <div className="button">
          <button onClick={() => handlePurchase()}>Finalizar pedido</button>
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
