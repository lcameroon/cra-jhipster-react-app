import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getSession } from '../../../shared/reducers/auth';
import { saveAccountSettings, reset } from './settings.reducer';
import { ValidatedField, ValidatedForm, isEmail } from '../../../shared/components/form';
import { CommonPage } from '../../../shared/components';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

export const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.auth.account);
  const successMessage = useAppSelector((state) => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = (values) => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      }),
    );
  };

  return (
    <CommonPage title="Settings">
      <div className="ion-content-max-width">
        <h6 className="ion-no-margin ion-padding-bottom ion-padding-start opacity-50">
          User settings for {account.email}
        </h6>

        <div className="ion-card ion-padding">
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label="First name"
              id="firstName"
              validate={{
                required: { value: true, message: 'validate.firstname.required' },
                minLength: { value: 1, message: 'validate.firstname.minlength' },
                maxLength: { value: 50, message: 'validate.firstname.maxlength' },
              }}
            />
            <ValidatedField
              name="lastName"
              label="Last name"
              id="lastName"
              validate={{
                required: { value: true, message: 'validate.lastname.required' },
                minLength: { value: 1, message: 'validate.lastname.minlength' },
                maxLength: { value: 50, message: 'validate.lastname.maxlength' },
              }}
            />
            <ValidatedField
              name="email"
              label="E-mail"
              type="email"
              required
              validate={{
                required: { value: true, message: 'email.required' },
                minLength: { value: 5, message: 'email.minlength' },
                maxLength: { value: 254, message: 'email.maxlength' },
                validate: (v) => isEmail(v) || 'email.invalid',
              }}
            />
            <ValidatedField id="langKey" name="langKey" label="Language" readOnly />
            <IonButton color="primary" type="submit">
              Save
            </IonButton>
          </ValidatedForm>
        </div>
      </div>
    </CommonPage>
  );
};

export default SettingsPage;
