import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from '../shared/error/error-boundary-route';

import Label from './label';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}label`} component={Label} />
  </Switch>
);

export default Routes;
