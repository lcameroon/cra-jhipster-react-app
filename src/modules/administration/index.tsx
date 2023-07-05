import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';
import UserManagement from './user-management';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
  </>
);

export default Routes;
