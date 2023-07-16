import React, { useEffect } from 'react';

import { useAppDispatch } from '../../config/store';
import { logout } from '../../shared/reducers/auth';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../../shared/components';

export const Logout: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(async () => {
      await dispatch(logout());
      history.push('/');
    }, 500);
  }, [dispatch, history]);

  return (
    <div className="ion-padding ion-margin ion-text-center">
      <Loading />
      <h2>Logged out successfully!</h2>
    </div>
  );
};

export default Logout;
