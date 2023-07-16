import { IonButton, IonAlert, IonModal, useIonLoading } from '@ionic/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CommonPage, ValidatedField, ValidatedForm } from '../../shared/components';

export interface Props {
  showModal: boolean;
  loading: boolean;
  loginError: boolean;
  handleLogin: (email: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

const LoginModal: React.FC<Props> = ({ handleLogin, handleClose, loginError, showModal, loading }) => {
  const login = ({ email, password, rememberMe }: any) => {
    handleLogin(email, password, rememberMe);
  };
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (loading) {
      present();
    }
    if (loginError) {
      dismiss();
    }
    return () => {
      dismiss();
    };
  }, [loading, loginError]);

  return (
    <>
      <IonModal isOpen={showModal} id="login-page" canDismiss={false}>
        <CommonPage title="Login">
          {loginError ? (
            <IonAlert color="danger" data-cy="loginError">
              <strong>Failed to sign in!</strong> Please check your credentials and try again.
            </IonAlert>
          ) : null}
          <ValidatedForm onSubmit={login} defaultValues={{ rememberMe: true }}>
            <ValidatedField
              name="email"
              type="email"
              label="E-mail"
              required
              autoFocus
              validate={{
                required: { value: true, message: 'E-mail cannot be empty!' },
              }}
            />
            <ValidatedField
              name="password"
              type="password"
              label="Password"
              required
              validate={{
                required: { value: true, message: 'Password cannot be empty!' },
              }}
            />
            <ValidatedField name="rememberMe" check label="Remember" />
            <p>
              <Link to="/account/reset/request">Did you forget your password?</Link>
            </p>
            <p>
              <span>You don&apos;t have an account yet? </span>
              <Link to="/account/register">Register a new account</Link>
            </p>
            <div className="d-flex justify-content-between">
              <IonButton color="secondary" onClick={handleClose} shape="round">
                Cancel
              </IonButton>
              <IonButton color="primary" type="submit" shape="round">
                Sign in
              </IonButton>
            </div>
          </ValidatedForm>
        </CommonPage>
      </IonModal>
    </>
  );
};

export default LoginModal;
