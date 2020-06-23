import { combineReducers } from 'redux';
import cart from './cart/reducer';
import user from './user/reducer';
import auth from './auth/reducer';

export default combineReducers({
  cart,
  auth,
  user,
});
