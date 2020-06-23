import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import List from '../pages/List';
import Cart from '../pages/Cart';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Product from '~/pages/Product';
import ProductDetails from '../pages/ProductDetails';
import ResetPassword from '../pages/ResetPassword';
import Department from '~/pages/Admin/Department';
import StoreDepartment from '~/pages/Admin/Department/Store';
import UpdateDepartment from '~/pages/Admin/Department/Update';
import UserAddress from '~/pages/User/Address';
import StoreUserAddress from '~/pages/User/Address/Store';
import UpdateUserAddress from '~/pages/User/Address/Update';
import Checkout from '~/pages/Checkout';
import CheckoutCancel from '~/pages/Checkout/Cancel';
import CheckoutSuccess from '~/pages/Checkout/Success';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={() => <Home res="" />} />
      <Route path="/list/:id" exact component={() => <List />} />
      {/* deixar apenas /, podemos la dentro chamar, produts/ e os outros product/:pros */}
      <Route path="/cue" component={() => <Home res="1" />} />
      <Route path="/shirt" component={() => <Home res="9" />} />
      <Route path="/table" component={() => <Home res="10" />} />
      <Route path="/chalk" component={() => <Home res="11" />} />
      <Route path="/ball" component={() => <Home res="14" />} />
      <Route path="/other" component={() => <Home res="12" />} />
      <Route path="/cart" component={Cart} />
      <Route path="/admin/department/update/:id" component={UpdateDepartment} />
      <Route path="/admin/department/store" component={StoreDepartment} />
      <Route path="/admin/department" component={Department} />
      <Route path="/user/address/store" component={StoreUserAddress} />
      <Route path="/user/address/update" component={UpdateUserAddress} />
      <Route path="/user/address" component={UserAddress} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/login" component={SignIn} auth />
      <Route path="/register" component={SignUp} auth />
      <Route path="/reset-password" component={ResetPassword} auth />
      <Route path="/product" component={Product} adm />

      <Route path="/users/checkout/success" component={CheckoutSuccess} isPrivate />
      <Route path="/users/checkout/cancel" component={CheckoutCancel} isPrivate />
      <Route path="/users/checkout" component={Checkout} isPrivate />


      <Route path="/" component={() => <Home res="all" />} />
    </Switch>
  );
}
