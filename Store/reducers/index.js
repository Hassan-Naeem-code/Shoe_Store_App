import {combineReducers} from 'redux';
import Auth from './auth';
import Products from './products';
import Cart from './cart';

export default combineReducers({
  auth: Auth,
  products: Products,
  cart : Cart
});