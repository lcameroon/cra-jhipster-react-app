import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import Label from './label';
import LabelDetail from './label-detail';
import LabelUpdate from './label-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LabelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LabelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LabelDetail} />
      <ErrorBoundaryRoute path={match.url} component={Label} />
    </Switch>
  </>
);

export default Routes;
