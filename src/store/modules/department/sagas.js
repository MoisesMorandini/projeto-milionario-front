import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import apiBack from '../../../services/apiBack';
import { deleteDepartmentFailure } from './actions';
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
    // yield put(deleteDepartmentFailure);
  }
}

export default all([
  takeLatest('@department/INSERT_DEPARTMENT_REQUEST', insertDepartment),
]);
