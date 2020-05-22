import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import apiBack from '../../../services/apiBack';
import {
  deleteDepartmentFailure,
  insertDepartmentFailure,
  updateDepartmentSuccess,
  updateDepartmentFailure,
} from './actions';
import history from '../../../services/history';

function refresh() {
  history.push('/admin/department');
}

export function* insertDepartment({ payload }) {
  try {
    const { name } = payload.data;
    const department = { name };
    yield call(apiBack.post, 'department', department);

    refresh();
    toast.success('Departamento inserido com sucesso!');
  } catch (error) {
    toast.error('Erro ao salvar, por favor verifique os dados!');
    yield put(insertDepartmentFailure());
  }
}

export function* deleteDepartment({ payload }) {
  try {
    const { id } = payload;
    yield call(apiBack.delete, `department/${id}`);

    refresh();
    toast.success('Departamento excluído com sucesso!');
  } catch (error) {
    toast.error('Erro ao excluir departamento!');
    yield put(deleteDepartmentFailure());
  }
}

export function* updateDepartment({ payload }) {
  try {
    const department = payload.data;

    const response = yield call(apiBack.put, `department/${department.id}`, department);

    refresh();
    toast.success('Departamento atualizado com sucesso');
    yield put(updateDepartmentSuccess(response.data));
  } catch (error) {
    toast.error(
      'Erro ao atualizar departamento, por favor verifique os dados!',
    );
    yield put(updateDepartmentFailure());
  }
}

export default all([
  takeLatest('@department/INSERT_DEPARTMENT_REQUEST', insertDepartment),
  takeLatest('@department/UPDATE_DEPARTMENT_REQUEST', updateDepartment),
  takeLatest('@department/DELETE_DEPARTMENT_REQUEST', deleteDepartment),
]);
