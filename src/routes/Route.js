import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import DefaultLayout from '~/pages/_layouts/default';
import AuthLayout from '~/pages/_layouts/auth';
import Dashboard from '~/pages/_layouts/admin';
import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  auth,
  adm,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const { user } = store.getState();

  console.log('user:', user);
  console.log('signed:', signed);
  console.log('adm:', adm);
  console.log('auth:', auth);
  console.log('isPrivate', isPrivate);

  let Layout = null;
  if (user.profile && adm) {
    if (user.profile.administrator) {
      Layout = Dashboard;
    } else {
      return <Redirect to="/" />;
    }
  }

  if (signed && auth) {
    return <Redirect to="/" />;
  }

  if (!signed && isPrivate) return <Redirect to="/login" />;


  if (Layout == null) {
    Layout = !auth ? DefaultLayout : AuthLayout;
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
