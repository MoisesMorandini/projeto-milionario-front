import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import List from '../pages/List';
import Cart from '../pages/Cart';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProductDetails from '../pages/ProductDetails';
import ResetPassword from '../pages/ResetPassword';
import Department from '~/pages/Admin/Department';
import StoreDepartment from '~/pages/Admin/Department/Store';
import UpdateDepartment from '~/pages/Admin/Department/Update';
import UserAddress from '~/pages/User/Address';
import UserAccount from '~/pages/User/Account';
import StoreUserAddress from '~/pages/User/Address/Store';
import UpdateUserAddress from '~/pages/User/Address/Update';
import ForgotPassword from '~/pages/ForgotPassword';
import Banner from '~/pages/Admin/Banner';
import StoreBanner from '~/pages/Admin/Banner/Store';
import UpdateBanner from '~/pages/Admin/Banner/Update';
import Logo from '~/pages/Admin/Logo';
import StoreLogo from '~/pages/Admin/Logo/Store';
import UpdateLogo from '~/pages/Admin/Logo/Update';
import HomeAdmin from '~/pages/Admin';
import CheckoutAddress from '~/pages/Checkout/Address';
import CheckoutSuccess from '~/pages/Checkout/Success';
import CheckoutCancel from '~/pages/Checkout/Cancel';
import MyRequests from '~/pages/MyRequests';
import Category from '~/pages/Admin/Category';
import StoreCategory from '~/pages/Admin/Category/Store';
import UpdateCategory from '~/pages/Admin/Category/Update';
import ProductAdmin from '~/pages/Admin/Product';
import StoreProduct from '~/pages/Admin/Product/Store';
import UpdateProduct from '~/pages/Admin/Product/Update';
import Order from '~/pages/MyRequests';
import Orders from '~/pages/Admin/Orders';
import Sales from '~/pages/Admin/Sales';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={() => <Home res="" />} />
      <Route path="/list/:id" exact component={() => <List />} />

      <Route path="/search/:name" exact component={() => <List />} />

      <Route path="/cart" component={Cart} />

      <Route path="/user/address/store/:checkout" component={StoreUserAddress} />
      <Route path="/user/address/store" component={StoreUserAddress} />
      <Route path="/user/address/update" component={UpdateUserAddress} />
      <Route path="/user/address" component={UserAddress} />

      <Route path="/user/account" component={UserAccount} />

      <Route path="/forgot-password" component={ForgotPassword} auth />
      <Route path="/user/orders" component={Order} auth />

      <Route path="/admin/orders" component={Orders} adm isPrivate />
      <Route path="/admin/sales" component={Sales} adm isPrivate />

      <Route path="/admin/department/update/:id" component={UpdateDepartment} adm isPrivate />
      <Route path="/admin/department/store" component={StoreDepartment} adm isPrivate />
      <Route path="/admin/department" component={Department} adm isPrivate />

      <Route path="/admin/banner/update/:id" component={UpdateBanner} adm />
      <Route path="/admin/banner/store" component={StoreBanner} adm />
      <Route path="/admin/banner" component={Banner} adm />

      <Route path="/admin/categories" exact component={Category} adm isPrivate />
      <Route path="/admin/categories/store" component={StoreCategory} adm isPrivate />
      <Route path="/admin/categories/update/:id" component={UpdateCategory} adm isPrivate />

      <Route path="/admin/products" exact component={ProductAdmin} adm isPrivate />
      <Route path="/admin/products/store" exact component={StoreProduct} adm isPrivate />
      <Route path="/admin/products/update/:id" exact component={UpdateProduct} adm isPrivate />

      <Route path="/admin/logo/update/:id" component={UpdateLogo} adm />
      <Route path="/admin/logo/store" component={StoreLogo} adm />
      <Route path="/admin/logo" component={Logo} adm />

      <Route path="/admin/department/update/:id" component={UpdateDepartment} adm isPrivate />
      <Route path="/admin/department/store" component={StoreDepartment} adm isPrivate />
      <Route path="/admin/department" component={Department} adm isPrivate />

      <Route path="/admin" component={HomeAdmin} adm isPrivate />

      <Route path="/my-requests" component={MyRequests} />

      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/login" component={SignIn} auth />
      <Route path="/register" component={SignUp} auth />
      <Route path="/reset-password" component={ResetPassword} auth />
      <Route path="/users/payment/address" component={CheckoutAddress} isPrivate />
      <Route path="/users/checkout/success" component={CheckoutSuccess} isPrivate />
      <Route path="/users/checkout/cancel" component={CheckoutCancel} isPrivate />
      <Route path="/" component={() => <Home res="all" />} />
    </Switch>
  );
}
