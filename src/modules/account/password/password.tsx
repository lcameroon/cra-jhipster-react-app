import { IonButton, IonCard } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getSession } from '../../../shared/reducers/auth';
import PasswordStrengthBar from '../../../shared/components/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';
import { ValidatedField, ValidatedForm } from '../../../shared/components/form';
import { CommonPage } from '../../../shared/components';

export const PasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());

    return () => {
      dispatch(reset());
    };
  }, []); // eslint-disable-line

  const handleValidSubmit: any = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = (event) => setPassword(event.target.value);

  const account = useAppSelector((state) => state.auth.account);
  const successMessage = useAppSelector((state) => state.password.successMessage);
  const errorMessage = useAppSelector((state) => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.success(errorMessage);
    }
  }, [successMessage, errorMessage]);

  return (
    <CommonPage title="Password">
      <div className="ion-content-max-width">
        <h6 className="ion-no-margin ion-padding-bottom ion-padding-start opacity-50">Update your Password</h6>
        <div className="ion-card ion-padding">
          <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="currentPassword"
              label="Current Password"
              type="password"
              validate={{
                required: { value: true, message: 'validate.newpassword.required' },
              }}
              data-cy="currentPassword"
            />
            <ValidatedField
              name="newPassword"
              label="New Password"
              type="password"
              validate={{
                required: { value: true, message: 'validate.newpassword.required' },
                minLength: { value: 4, message: 'validate.newpassword.minlength' },
                maxLength: { value: 50, message: 'validate.newpassword.maxlength' },
              }}
              onChange={updatePassword}
              data-cy="newPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="confirmPassword"
              label="Confirm password"
              type="password"
              validate={{
                required: { value: true, message: 'validate.confirmpassword.required' },
                minLength: { value: 4, message: 'validate.confirmpassword.minlength' },
                maxLength: { value: 50, message: 'validate.confirmpassword.maxlength' },
                validate: (v) => v === password || 'error.dontmatch',
              }}
              data-cy="confirmPassword"
            />
            <IonButton color="primary" type="submit">
              Save
            </IonButton>
          </ValidatedForm>
        </div>
      </div>
    </CommonPage>
  );
};

export default PasswordPage;
