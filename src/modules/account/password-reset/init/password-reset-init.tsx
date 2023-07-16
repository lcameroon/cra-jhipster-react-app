import { IonAlert, IonButton, IonCard } from '@ionic/react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { handlePasswordResetInit, reset } from '../password-reset.reducer';
import { useAppDispatch, useAppSelector } from '../../../../config/store';
import { ValidatedField, ValidatedForm, isEmail } from '../../../../shared/components/form';
import { CommonPage } from '../../../../shared/components';

export const PasswordResetInit: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleValidSubmit: any = ({ email }) => {
    dispatch(handlePasswordResetInit(email));
  };

  const successMessage = useAppSelector((state) => state.passwordReset.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <CommonPage title="Reset password">
      <IonCard>
        <h1>Reset your password</h1>
        <IonAlert color="warning">Enter the email address you used to register</IonAlert>
        <ValidatedForm onSubmit={handleValidSubmit}>
          <ValidatedField
            name="email"
            label="E-mail"
            type="email"
            validate={{
              required: { value: true, message: 'validate.email.required' },
              minLength: { value: 5, message: 'validate.email.minlength' },
              maxLength: { value: 254, message: 'validate.email.maxlength' },
              validate: (v) => isEmail(v) || 'validate.email.invalid',
            }}
          />
          <IonButton color="primary" type="submit">
            Reset password
          </IonButton>
        </ValidatedForm>
      </IonCard>
    </CommonPage>
  );
};

export default PasswordResetInit;
