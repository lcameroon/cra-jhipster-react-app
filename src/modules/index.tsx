import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from '../shared/error/error-boundary-route';

import BankAccount from './bank-account';
import Label from './label';
import Operation from './operation';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}bank-account`} component={BankAccount} />
      <ErrorBoundaryRoute path={`${match.url}label`} component={Label} />
      <ErrorBoundaryRoute path={`${match.url}operation`} component={Operation} />
    </Switch>
  </>
);

export default Routes;
