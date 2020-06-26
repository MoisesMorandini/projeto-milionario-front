export function updateCategoryRequest(data) {
  return {
    type: '@category/UPDATE_CATEGORY_REQUEST',
    payload: { data },
  };
}
export function updateCategorySuccess(category) {
  return {
    type: '@category/UPDATE_CATEGORY_SUCESS',
    payload: { category },
  };
}
export function updateCategoryFailure() {
  return {
    type: '@category/UPDATE_CATEGORY_FAILURE',
  };
}

export function deleteCategoryRequest(id) {
  return {
    type: '@category/DELETE_CATEGORY_REQUEST',
    payload: { id },
  };
}
export function deleteCategorySuccess(id) {
  return {
    type: '@category/DELETE_CATEGORY_SUCESS',
    payload: { id },
  };
}
export function deleteCategoryFailure() {
  return {
    type: '@category/DELETE_CATEGORY_FAILURE',
  };
}
export function insertCategoryRequest(data) {
  return {
    type: '@category/INSERT_CATEGORY_REQUEST',
    payload: { data },
  };
}
export function insertCategorySuccess(category) {
  return {
    type: '@category/INSERT_CATEGORY_REQUEST',
    payload: { category },
  };
}
export function insertCategoryFailure() {
  return {
    type: '@category/INSERT_CATEGORY_REQUEST',
  };
}
