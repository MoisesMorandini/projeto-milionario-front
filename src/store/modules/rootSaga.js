import { all } from 'redux-saga/effects';
import cart from './cart/sagas';
import auth from './auth/sagas';
import user from './user/sagas';
import purchase from './purchase/sagas';
import product from './product/sagas';
import department from './department/sagas';

export default function* rootSaga() {
  return yield all([cart, auth, user, purchase, product, department]);
}
