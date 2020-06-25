export function updateLogoRequest(data) {
  return {
    type: '@logo/UPDATE_LOGO_REQUEST',
    payload: { data },
  };
}
export function updateLogoSuccess(logo) {
  return {
    type: '@logo/UPDATE_LOGO_SUCESS',
    payload: { logo },
  };
}
export function updateLogoFailure() {
  return {
    type: '@logo/UPDATE_LOGO_FAILURE',
  };
}

export function deleteLogoRequest(id) {
  return {
    type: '@logo/DELETE_LOGO_REQUEST',
    payload: { id },
  };
}
export function deleteLogoSuccess(id) {
  return {
    type: '@logo/DELETE_LOGO_SUCESS',
    payload: { id },
  };
}
export function deleteLogoFailure() {
  return {
    type: '@logo/DELETE_LOGO_FAILURE',
  };
}
export function insertLogoRequest(data) {
  return {
    type: '@logo/INSERT_LOGO_REQUEST',
    payload: { data },
  };
}
export function insertLogoSuccess(logo) {
  return {
    type: '@logo/INSERT_LOGO_REQUEST',
    payload: { logo },
  };
}
export function insertLogoFailure() {
  return {
    type: '@logo/INSERT_LOGO_REQUEST',
  };
}
