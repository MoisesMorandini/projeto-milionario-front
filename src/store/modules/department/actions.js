export function updateDepartmentRequest(data) {
  return {
    type: '@department/UPDATE_DEPARTMENT_REQUEST',
    payload: { data },
  };
}
export function updateDepartmentSuccess(department) {
  return {
    type: '@department/UPDATE_DEPARTMENT_SUCESS',
    payload: { department },
  };
}
export function updateDepartmentFailure() {
  return {
    type: '@department/UPDATE_DEPARTMENT_FAILURE',
  };
}

export function deleteDepartmentRequest(id) {
  return {
    type: '@department/DELETE_DEPARTMENT_REQUEST',
    payload: { id },
  };
}
export function deleteDepartmentSuccess(id) {
  return {
    type: '@department/DELETE_DEPARTMENT_SUCESS',
    payload: { id },
  };
}
export function deleteDepartmentFailure() {
  return {
    type: '@department/DELETE_DEPARTMENT_FAILURE',
  };
}
export function insertDepartmentRequest(data) {
  return {
    type: '@department/INSERT_DEPARTMENT_REQUEST',
    payload: { data },
  };
}
export function insertDepartmentSuccess(department) {
  return {
    type: '@department/INSERT_DEPARTMENT_REQUEST',
    payload: { department },
  };
}
export function insertDepartmentaFailure() {
  return {
    type: '@department/INSERT_DEPARTMENT_REQUEST',
  };
}
