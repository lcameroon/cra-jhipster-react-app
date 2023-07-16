import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import Settings from './settings/settings';
import Password from './password/password';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings} />
    <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
  </>
);

export default Routes;
