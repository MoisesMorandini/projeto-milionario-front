import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import apiBack from '../../../services/apiBack';
import {
  deleteLogoFailure,
  insertLogoFailure,
  updateLogoSuccess,
  updateLogoFailure,
} from './actions';
import history from '../../../services/history';

function refresh() {
  history.push('/admin/logo');
}

export function* insertLogo({ payload }) {
  console.log('insert LOGo');
  try {
    const logo = payload.data;

    yield call(apiBack.post, 'logo', logo);

    refresh();
    toast.success('Logo inserido com sucesso!');
  } catch (error) {
    toast.error('Erro ao salvar, por favor verifique os dados!');
    yield put(insertLogoFailure());
  }
}

export function* deleteLogo({ payload }) {
  try {
    const { id } = payload;
    yield call(apiBack.delete, `logo/${id}`);

    refresh();
    toast.success('Logo excluído com sucesso!');
  } catch (error) {
    toast.error('Erro ao excluir logo!');
    yield put(deleteLogoFailure());
  }
}

export function* updateLogo({ payload }) {
  try {
    const logo = payload.data;


    const response = yield call(apiBack.put, `logo/${logo.id}`, logo);


    refresh();
    toast.success('Logo atualizado com sucesso');
    yield put(updateLogoSuccess(response.data));
  } catch (error) {
    toast.error(
      'Erro ao atualizar logo, por favor verifique os dados!',
    );
    yield put(updateLogoFailure());
  }
}

export default all([
  takeLatest('@logo/INSERT_LOGO_REQUEST', insertLogo),
  takeLatest('@logo/UPDATE_LOGO_REQUEST', updateLogo),
  takeLatest('@logo/DELETE_LOGO_REQUEST', deleteLogo),
]);
