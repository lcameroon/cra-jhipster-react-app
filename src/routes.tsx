import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';

import Login from './modules/login/login';
import Register from './modules/account/register/register';
import Activate from './modules/account/activate/activate';
import PasswordResetInit from './modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from './modules/account/password-reset/finish/password-reset-finish';
import Logout from './modules/login/logout';
import Home from './modules/home/home';
import Entities from './modules';
import PrivateRoute from './shared/auth/private-route';
import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';
import { AUTHORITIES } from './config/constants';

const Account = lazy(() => import('./modules/account'));

const Admin = lazy(() => import('./modules/administration'));

const Routes: React.FC = () => {
  return (
    <>
      <Switch>
        <ErrorBoundaryRoute path="/login" component={Login} />
        <ErrorBoundaryRoute path="/logout" component={Logout} />
        <ErrorBoundaryRoute path="/account/register" component={Register} />
        <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate} />
        <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit} />
        <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish} />
        <PrivateRoute
          path="/admin"
          hasAnyAuthorities={[AUTHORITIES.ADMIN]}
          component={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Admin {...props} />
            </Suspense>
          )}
        />
        <PrivateRoute
          path="/account"
          hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
          component={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Account {...props} />
            </Suspense>
          )}
        />
        <ErrorBoundaryRoute path="/" exact component={Home} />
        <PrivateRoute path="/" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
        <ErrorBoundaryRoute component={PageNotFound} />
      </Switch>
    </>
  );
};

export default Routes;
