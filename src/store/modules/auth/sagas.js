import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/apiBack';
import { signInSucess, signFailure } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, user));

    history.push('/');
  } catch (err) {
    toast.error('E-mail ou senha inválidos!');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const {
      name, email, password, cpf, rg, first_phone, second_phone,
    } = payload;

    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
      cpf,
      rg,
      first_phone,
      second_phone,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, user));

    history.push('/');
  } catch (error) {
    toast.error('Falha no cadastro, verifique seus dados!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
