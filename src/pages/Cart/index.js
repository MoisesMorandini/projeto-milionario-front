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
import {
 Container, ProductTable, Total, Finish
} from './styles';

function Cart({
 cart, total, totalRaw, removeFromCart, updateAmountRequest
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
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.file.url} alt={product.name} />
              </td>
              <td>
                <strong>{product.name}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#3b83ff" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#3b83ff" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="#3b83ff" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <select onChange={e => setInstallments(e.target.value)}>
          {renderInstallments()}
        </select>

        <Finish to="/payment">
          <button onClick={() => handlePurchase()}>Finalizar pedido</button>
        </Finish>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
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

export default connect(mapStateToPros, mapDispatchToProps)(Cart);
