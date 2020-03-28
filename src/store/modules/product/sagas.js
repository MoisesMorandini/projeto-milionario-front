import { takeLatest, call, put, all } from 'redux-saga/effects';
import apiBack from '../../../services/apiBack';
import { toast } from 'react-toastify';
import {
  updateProductSucess,
  updateProductFailure,
  deleteProductSucess,
  deleteProductFailure,
} from './actions';
import history from '../../../services/history';
export function* updateProduct({ payload }) {
  try {
    const product = payload.data;
    const response = yield call(apiBack.put, 'product', product);

    toast.success('Producto atualizado com sucesso');

    yield put(updateProductSucess(response.data));
    // refresh();
  } catch (error) {
    toast.error('Erro ao atualizar produto, por favor verifique os dados!');
    yield put(updateProductFailure());
  }
}
export function* deleteProduct({ payload }) {
  try {
    const { id } = payload;
    yield call(apiBack.delete, `product/${id}`);
    toast.success('Produto excluído com sucesso');

    refresh();
  } catch (error) {
    toast.error('Erro ao excluír produto!');
    yield put(deleteProductFailure());
  }
}

export function* insertProduct({ payload }) {
  try {
    const {
      name,
      description,
      stock,
      price,
      category_id,
      file_id,
    } = payload.data;
    const product = {
      name,
      description,
      stock,
      price,
      category_id,
      file_id,
    };
    const response = yield call(apiBack.post, 'product', product);

    toast.success('Produto inserido com sucesso!!!');
    refresh();
  } catch (error) {
    toast.error('Falha ao inserir. Favor verifique os dados!');
    yield put(deleteProductFailure);
  }
}

function refresh() {
  history.push('/');
  history.push('/product');
}

export default all([
  takeLatest('@product/UPDATE_PRODUCT_REQUEST', updateProduct),
  takeLatest('@product/DELETE_PRODUCT_REQUEST', deleteProduct),
  takeLatest('@product/INSERT_PRODUCT_REQUEST', insertProduct),
]);
