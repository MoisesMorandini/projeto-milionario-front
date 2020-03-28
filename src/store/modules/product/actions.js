export function updateProductRequest(data) {
  return {
    type: '@product/UPDATE_PRODUCT_REQUEST',
    payload: { data },
  };
}
export function updateProductSucess(product) {
  return {
    type: '@product/UPDATE_PRODUCT_SUCESS',
    payload: { product },
  };
}
export function updateProductFailure() {
  return {
    type: '@product/UPDATE_PRODUCT_FAILURE',
  };
}

export function deleteProductRequest(id) {
  return {
    type: '@product/DELETE_PRODUCT_REQUEST',
    payload: { id },
  };
}
export function deleteProductSucess(id) {
  return {
    type: '@product/DELETE_PRODUCT_SUCESS',
    payload: { id },
  };
}
export function deleteProductFailure() {
  return {
    type: '@product/DELETE_PRODUCT_FAILURE',
  };
}
export function insertProductRequest(data) {
  return {
    type: '@product/INSERT_PRODUCT_REQUEST',
    payload: { data },
  };
}
export function insertProductSuces(product) {
  return {
    type: '@product/INSERT_PRODUCT_REQUEST',
    payload: { product },
  };
}
export function insertProductaFailure() {
  return {
    type: '@product/INSERT_PRODUCT_REQUEST',
  };
}
