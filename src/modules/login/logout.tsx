import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../config/store';
import { logout } from '../../shared/reducers/authentication';

export const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const idToken = useAppSelector(state => state.authentication.idToken);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(logout());
    if (logoutUrl) {
      // if Keycloak, logoutUrl has protocol/openid-connect in it
      window.location.href = (logoutUrl as any).includes('/protocol')
        ? logoutUrl + '?redirect_uri=' + window.location.origin
        : logoutUrl + '?id_token_hint=' + idToken + '&post_logout_redirect_uri=' + window.location.origin;
    }
  });

  return (
    <div className="p-5">
      <h4>Logged out successfully!</h4>
    </div>
  );
};

export default Logout;
