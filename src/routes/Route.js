import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import DefaultLayout from '~/pages/_layouts/default';
import AuthLayout from '~/pages/_layouts/auth';
import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  auth,
  adm,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const user = store.getState().user;
  console.tron.log(user);
  if (!signed && isPrivate) return <Redirect to="/login" />;

  if (signed && auth) return <Redirect to="/" />;

  if (user.profile) {
    if (!user.profile.administrator && adm) return <Redirect to="/" />;
  }
  const Layout = !auth ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
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
