import React, { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../config/store';
import { login } from '../../shared/reducers/auth';
import LoginModal from './login-modal';

export const Login = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loginError = useAppSelector((state) => state.auth.loginError);
  const loading = useAppSelector((state) => state.auth.loading);
  const showModalLogin = useAppSelector((state) => state.auth.showModalLogin);
  const [showModal, setShowModal] = useState(showModalLogin);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleLogin = (email, password, rememberMe = false) => dispatch(login(email, password, rememberMe));

  const handleClose = () => {
    setShowModal(false);
    props.history.push('/');
  };

  const { location } = props;
  const { from } = (location.state as any) || { from: { pathname: '/', search: location.search } };
  if (isAuthenticated) {
    return <Redirect to={from} />;
  }

  return (
    <LoginModal
      showModal={showModal}
      handleLogin={handleLogin}
      handleClose={handleClose}
      loginError={loginError}
      loading={loading}
    />
  );
};

export default Login;
