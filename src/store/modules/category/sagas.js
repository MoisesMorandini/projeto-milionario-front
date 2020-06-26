import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import apiBack from '../../../services/apiBack';
import {
  deleteCategoryFailure,
  insertCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
} from './actions';
import history from '../../../services/history';

function refresh() {
  history.push('/admin/categories');
}
export function* insertCategory({ payload }) {
  try {
    const { name, department_id } = payload.data;
    const category = { name, department_id };
    yield call(apiBack.post, 'categories', category);
    refresh();
    toast.success('Categoria inserida com sucesso!');
  } catch (error) {
    toast.error('Erro ao salvar, por favor verifique os dados!');
    yield put(deleteCategoryFailure());
  }
}

export function* updateCategory({ payload }) {
  try {
    const { id, name, department_id } = payload.data;
    const category = { id, name, department_id };
    const response = yield call(apiBack.put, `categories/${id}`, category);

    yield put(updateCategorySuccess(response.data));
    refresh();
    toast.success('Categoria atualizada com sucesso');
  } catch (error) {
    toast.error(
      'Erro ao atualizar categoria, por favor verifique os dados!',
    );
    yield put(deleteCategoryFailure());
  }
}

export function* deletecategory({ payload }) {
  try {
    const { id } = payload;
    yield call(apiBack.delete, `categories/${id}`);

    refresh();
    toast.success('Categoria excluída com sucesso!');
  } catch (error) {
    toast.error('Erro ao excluir categoria!');
    yield put(deleteCategoryFailure());
  }
}


export default all([
  takeLatest('@category/INSERT_CATEGORY_REQUEST', insertCategory),
  takeLatest('@category/UPDATE_CATEGORY_REQUEST', updateCategory),
  takeLatest('@category/DELETE_CATEGORY_REQUEST', deletecategory),
]);
