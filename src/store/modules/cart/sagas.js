import {
 call, select, put, all, takeLatest
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { addToCartSucess, updateAmountSucess } from './actions';
import { formatPrice } from '../../../util/format';
import apiBack from '../../../services/apiBack';

function* addToCart({ id, search }) {
  const productExists = yield select((state) =>
    state.cart.find(p => p.id === id),
  );
  // pega do api a quantidadade do stock
  const stock = yield call(apiBack.get, `/product/stock/${id}`);

  // salve o stock
  const stockAmount = stock.data;
  // veririca se o quanto de produto ja foi solicitado pro carrinho. Se existir, salva este valor
  // else, inicia com 0
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;
  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  // se existir no carrinho apenas muda a quantidade
  // se nao, adiciona no carrinho
  if (productExists) {
    yield put(updateAmountSucess(id, amount));
  } else {
    const response = yield call(apiBack.get, `/product/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    toast.success('Produto adicionado no carrinho');
    yield put(addToCartSucess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;
  const stock = yield call(apiBack.get, `/product/stock/${id}`);
  const stockAmount = stock.data;
  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }
  toast.success('Quantidade alterada com sucesso!');
  yield put(updateAmountSucess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
