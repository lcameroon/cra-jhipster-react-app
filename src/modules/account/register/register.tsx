import { IonAlert, IonButton, IonCard } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import PasswordStrengthBar from '../../../shared/components/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from '../../../config/store';
import { handleRegister, reset } from './register.reducer';
import { ValidatedField, ValidatedForm, isEmail } from '../../../shared/components/form';
import { CommonPage } from '../../../shared/components';

export const RegisterPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [], // eslint-disable-line
  );

  const handleValidSubmit: any = ({ username, email, firstPassword }) => {
    dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: 'en' }));
  };

  const updatePassword = (event) => setPassword(event.target.value);

  const successMessage = useAppSelector((state) => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <CommonPage title="Registration">
      <IonCard>
        <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
          <ValidatedField
            name="username"
            label="Username"
            validate={{
              required: { value: true, message: 'validate.login.required' },
              minLength: { value: 1, message: 'validate.login.minlength' },
              maxLength: { value: 50, message: 'validate.login.maxlength' },
            }}
            data-cy="username"
          />
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
            data-cy="email"
          />
          <ValidatedField
            name="firstPassword"
            label="New password"
            type="password"
            onChange={updatePassword}
            validate={{
              required: { value: true, message: 'validate.newpassword.required' },
              minLength: { value: 4, message: 'validate.newpassword.minlength' },
              maxLength: { value: 50, message: 'validate.newpassword.maxlength' },
            }}
            data-cy="firstPassword"
          />
          <PasswordStrengthBar password={password} />
          <ValidatedField
            name="secondPassword"
            label="Confirm password"
            type="password"
            validate={{
              required: { value: true, message: 'validate.confirmpassword.required' },
              minLength: { value: 4, message: 'validate.confirmpassword.minlength' },
              maxLength: { value: 50, message: 'validate.confirmpassword.maxlength' },
              validate: (v) => v === password || 'error.dontmatch',
            }}
            data-cy="secondPassword"
          />
          <IonButton id="register-submit" color="primary" type="submit" data-cy="submit">
            Register
          </IonButton>
        </ValidatedForm>
        <p>&nbsp;</p>
        <IonAlert color="warning">
          <span>If you want to </span>
          <span className="alert-link">sign in </span>
          <span>
            , you can try the default accounts:
            <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
            <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
          </span>
        </IonAlert>
      </IonCard>
    </CommonPage>
  );
};

export default RegisterPage;
