import { IonButton, IonCard } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import { handlePasswordResetFinish, reset } from '../password-reset.reducer';
import PasswordStrengthBar from '../../../../shared/components/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from '../../../../config/store';
import { ValidatedField, ValidatedForm } from '../../../../shared/components/form';
import { getUrlParameter } from '../../../../shared/util';
import { CommonPage } from '../../../../shared/components';

export const PasswordResetFinishPage: React.FC<RouteComponentProps<{ key: string }>> = (props) => {
  const [password, setPassword] = useState('');
  const [key] = useState(getUrlParameter('key', props.location.search));
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []); // eslint-disable-line

  const handleValidSubmit: any = ({ newPassword }) => {
    dispatch(handlePasswordResetFinish({ key, newPassword }));
  };

  const updatePassword = (event) => setPassword(event.target.value);

  const successMessage = useAppSelector((state) => state.passwordReset.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <CommonPage title="Reset password">
      <IonCard>
        {key && (
          <ValidatedForm onSubmit={handleValidSubmit}>
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
              data-cy="resetPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              validate={{
                required: { value: true, message: 'validate.confirmpassword.required' },
                minLength: { value: 4, message: 'validate.confirmpassword.minlength' },
                maxLength: { value: 50, message: 'validate.confirmpassword.maxlength' },
                validate: (v) => v === password || 'error.dontmatch',
              }}
              data-cy="confirmResetPassword"
            />
            <IonButton color="success" type="submit" data-cy="submit">
              Validate new password
            </IonButton>
          </ValidatedForm>
        )}
      </IonCard>
    </CommonPage>
  );
};

export default PasswordResetFinishPage;
