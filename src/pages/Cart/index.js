import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdAdd,
} from 'react-icons/md';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import './style.css';

function Cart({
  cart, total, removeFromCart, updateAmountRequest,
}) {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const cartState = useSelector((state) => state.cart);
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="cart">
      {cart.map((product) => (
        <div className="product-cart">
          <article>
            <div className="divImage">
              <Link to={`/product/${product.id}`}>
                <img src={product.file_products[0].file.url} alt={product.file_products[0].file.name} />
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
          <button type="button" onClick={() => handleClickOpen()}>Finalizar pedido</button>
        </div>
        <div className="total">
          <strong>Total: </strong>
          <span>{total}</span>
        </div>
      </div>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Deseja finalizar sua compra?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Não
          </Button>
          <Link to="/users/payment/address">
            <Button color="primary">
              Sim
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
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
