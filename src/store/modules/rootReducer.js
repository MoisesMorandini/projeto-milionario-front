import { combineReducers } from 'redux';
import cart from './cart/reducer';
import user from './user/reducer';
import auth from './auth/reducer';
import purchase from './purchase/reducer';

export default combineReducers({
  cart,
  auth,
  user,
  purchase,
});
