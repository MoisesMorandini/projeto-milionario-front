export function updateBannerRequest(data) {
  return {
    type: '@banner/UPDATE_BANNER_REQUEST',
    payload: { data },
  };
}
export function updateBannerSuccess(banner) {
  return {
    type: '@banner/UPDATE_BANNER_SUCESS',
    payload: { banner },
  };
}
export function updateBannerFailure() {
  return {
    type: '@banner/UPDATE_BANNER_FAILURE',
  };
}

export function deleteBannerRequest(id) {
  return {
    type: '@banner/DELETE_BANNER_REQUEST',
    payload: { id },
  };
}
export function deleteBannerSuccess(id) {
  return {
    type: '@banner/DELETE_BANNER_SUCESS',
    payload: { id },
  };
}
export function deleteBannerFailure() {
  return {
    type: '@banner/DELETE_BANNER_FAILURE',
  };
}
export function insertBannerRequest(data) {
  return {
    type: '@banner/INSERT_BANNER_REQUEST',
    payload: { data },
  };
}
export function insertBannerSuccess(banner) {
  return {
    type: '@banner/INSERT_BANNER_REQUEST',
    payload: { banner },
  };
}
export function insertBannerFailure() {
  return {
    type: '@banner/INSERT_BANNER_REQUEST',
  };
}
