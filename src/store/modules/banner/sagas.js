import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import apiBack from '../../../services/apiBack';
import {
  deleteBannerFailure,
  insertBannerFailure,
  updateBannerSuccess,
  updateBannerFailure,
} from './actions';
import history from '../../../services/history';

function refresh() {
  history.push('/admin/banner');
}

export function* insertBanner({ payload }) {
  try {
    const banner = payload.data;

    yield call(apiBack.post, 'banner', banner);

    refresh();
    toast.success('Banner inserido com sucesso!');
  } catch (error) {
    toast.error('Erro ao salvar, por favor verifique os dados!');
    yield put(insertBannerFailure());
  }
}

export function* deleteBanner({ payload }) {
  try {
    const { id } = payload;
    yield call(apiBack.delete, `banner/${id}`);

    refresh();
    toast.success('Banner excluído com sucesso!');
  } catch (error) {
    toast.error('Erro ao excluir banner!');
    yield put(deleteBannerFailure());
  }
}

export function* updateBanner({ payload }) {
  try {
    const banner = payload.data;

    const response = yield call(apiBack.put, `banner/${banner.id}`, banner);

    refresh();
    toast.success('Banner atualizado com sucesso');
    yield put(updateBannerSuccess(response.data));
  } catch (error) {
    toast.error(
      'Erro ao atualizar banner, por favor verifique os dados!',
    );
    yield put(updateBannerFailure());
  }
}

export default all([
  takeLatest('@banner/INSERT_BANNER_REQUEST', insertBanner),
  takeLatest('@banner/UPDATE_BANNER_REQUEST', updateBanner),
  takeLatest('@banner/DELETE_BANNER_REQUEST', deleteBanner),
]);
